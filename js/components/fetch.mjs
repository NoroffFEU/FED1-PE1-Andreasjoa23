export async function fetchData() {
  const url = 'https://v2.api.noroff.dev/blog/posts/Alfred';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGV0ZXJKYWNrc29uIiwiZW1haWwiOiJQZXRlcl9KQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzE0Njc5NzE1fQ.N13nzN0e0VIEVRGQZaEqYgvTRHpP4JDRr0Q3we3OST8';

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + key
          }
      });

      if (!response.ok) {
          throw new Error('Network response not OK');
      }

      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

// data.sort((a, b) => new Date(b.created) - new Date(a.created));