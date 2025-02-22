```javascript
// pages/api/test.js
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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>Hello {data.message}</div>;
}

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

export default MyComponent;
```