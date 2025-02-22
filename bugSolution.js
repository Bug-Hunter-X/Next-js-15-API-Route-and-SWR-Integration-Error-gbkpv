```javascript
// pages/api/test.js
// remains unchanged
export default function handler(req, res) {
  console.log('Request received:', req.method, req.url);
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

```javascript
// pages/index.js
import useSWR from 'swr';

function MyComponent() {
  const { data, error } = useSWR('/api/test', fetcher);

  if (error) return <div>failed to load: {error.message}</div>;
  if (!data) return <div>loading...</div>;

  return <div>Hello {data.message}</div>;
}

async function fetcher(url) {
  const res = await fetch(url);
  // Added error handling for non-200 responses
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorData?.message || res.statusText}`);
  }
  return res.json();
}

export default MyComponent;
```