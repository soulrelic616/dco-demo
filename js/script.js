const brandConfigUrl = './config/brandConfig.json';

const weatherApi = 'https://example.com/api/weather';
const timeApi = 'https://example.com/api/time';
const productApi = 'https://example.com/api/product';

const fallbackImageUrl = 'fallback.png'; // Static backup image

// This function acts as a 'messenger' that goes out to the internet to grab 
// specific pieces of data (like weather or price) from a provided web address.
async function fetchData(url, fallback) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${url}`);
        return await res.json();
    } catch (err) {
        console.warn(err);
        return null; // Explicit null to trigger fallback mode
    }
}

// This function looks at the current hour (0-23) and decides if it is 
// morning, afternoon, or evening so the ad can say "Good Morning," etc.
function getTimeOfDay(hour) {
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
}

// If something goes wrong (like no internet connection), this function 
// hides the complex ad and shows a simple, pre-made 'backup' image instead.
function showFallbackOnly() {
    const container = document.getElementById('ad-container');
    container.innerHTML = ''; // Clear existing content

    const fallbackImg = document.createElement('img');
    fallbackImg.src = fallbackImageUrl;
    fallbackImg.alt = 'Fallback Advertisement';
    fallbackImg.style.maxWidth = '100%';
    fallbackImg.style.height = 'auto';

    container.appendChild(fallbackImg);
}

// This is the 'designer' function. It takes all the raw data (weather, time, product) 
// and maps it to the correct text and images to update what the user sees.
function updateCreative(config, { weather, time, product }) {
    const container = {
        headline: document.getElementById('headline'),
        image: document.getElementById('product-image'),
        subtext: document.getElementById('subtext')
    };

    const weatherKey = weather?.condition?.toLowerCase() || 'unknown';
    const timeOfDay = getTimeOfDay(time?.hour || new Date().getHours());

    const weatherData = config.weatherStates[weatherKey] || config.weatherStates.unknown;
    const timeOverride = config.timeOfDayOverrides?.[timeOfDay];

    const finalSubline = timeOverride?.subline || weatherData.subline;
    const productName = product?.name || config.defaultProduct;
    const region = product?.region || 'your area';
    const imageUrl = product?.image || fallbackImageUrl;

    container.headline.textContent = weatherData.headline;
    container.subtext.textContent = `${finalSubline} - Available in ${region}`;
    container.image.src = imageUrl;
    container.image.alt = `${config.brand} - ${productName}`;
}

// This is the 'brain' that coordinates everything. It requests all data at once, 
// checks if any info is missing, and then tells the ad to update or show the backup.
async function refreshCreative() {
    const [config, weather, time, product] = await Promise.all([
        fetchData(brandConfigUrl),
        fetchData(weatherApi),
        fetchData(timeApi),
        fetchData(productApi)
    ]);

    // Fail-safe: if any critical data is missing, show fallback image only
    if (!config || !weather || !time || !product) {
        console.warn('One or more data sources failed. Loading fallback.');
        showFallbackOnly();
        return;
    }

    updateCreative(config, { weather, time, product });
}

// Initial load
refreshCreative();
// This tells the ad to check for new data (like weather changes) every 60 seconds.
setInterval(refreshCreative, 60000);