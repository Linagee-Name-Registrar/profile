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
