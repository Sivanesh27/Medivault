const { GoogleSearch } = require('langchain/tools');

/**
 * @desc    Find nearby hospitals using a real-time search tool
 * @route   POST /api/location/hospitals
 * @access  Private
 */
exports.findNearbyHospitals = async (req, res) => {
    const { latitude, longitude } = req.body;

    // 1. Validate input
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        // 2. Use the search tool to find real-time information
        const search = new GoogleSearch(); 
        const query = `hospitals and clinics near ${latitude},${longitude}`;
        const searchResults = await search.call(query);

        // 3. Parse the plain text search result into a structured JSON array
        const hospitals = searchResults
            .split('\n') // Split the result into lines
            .filter(line => line.trim().length > 0) // Remove any empty lines
            .map(line => {
                const parts = line.split('·'); // The search result often uses a "·" to separate name and address
                return {
                    name: parts[0]?.trim(),
                    address: parts[1]?.trim() || 'Address not available',
                };
            })
            .filter(h => h.name); // Make sure the entry has a name

        // 4. Send the cleaned-up list back to the frontend
        res.json(hospitals.slice(0, 10)); // Return the top 10 results for a clean UI
    } catch (error) {
        console.error('Error fetching hospital data with search tool:', error);
        res.status(500).json({ message: 'Failed to fetch hospital data. Please try again later.' });
    }
};
