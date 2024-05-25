export async function fetchData(url, method, body = null, requireAuth = true) {
    let accessToken = '';
    if (requireAuth) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.accessToken) {
            accessToken = userInfo.accessToken;
        } else {
            console.error("Access token not found in localStorage.");
            throw new Error("Access token not found.");
        }
    }
    
    const headers = {
        'Content-Type': 'application/json'
    };

    if (requireAuth) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const fetchOptions = {
        method: method,
        headers: headers
    };

    if (body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`HTTP Error: ${response.status}`, errorData);
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data.data;
        } else {
            return null;
        }

    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}