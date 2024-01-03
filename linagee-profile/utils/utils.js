"use client"


export async function fetchNftData(tokenuri) {
    try {
        const res = await fetch(tokenuri, { method: 'GET'});
        
        if (!res.ok) {
            let errorData = null;
            try {
                errorData = await res.json();
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
            }

            //console.log(`HTTP error! status: ${res.status}`, res.status, errorData, res);
        }

        let jsonResponse = await res.json();
        return jsonResponse;
    } catch (error) {
        console.log("Error fetching metadata", tokenuri, error);
        return null
    }
}


export async function getMediaType(src) {
    try {
        const response = await fetch(src, { method: 'HEAD' });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const contentType = response.headers.get('content-type').toLowerCase();

        if (contentType.includes('video')) return 'video';
        if (contentType.includes('gif')) return 'gif';
        if (contentType.includes('image')) return 'image';

        return 'unknown';
    } catch (error) {
        console.error('Error fetching media type:', error);
        return 'unknown';
    }
}