import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`)
        .then(res => res.json())
        .then(data => {
          setProperty(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="container">
      <img src={property.image} alt={property.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      <h1>{property.title}</h1>
      <p>₹{property.price.toLocaleString()}</p>
      <p>{property.location}</p>
      <h2>Description</h2>
      <p>{property.description}</p>
      {/* Add more sections if schema expands, like from 99acres */}
    </div>
  );
}
