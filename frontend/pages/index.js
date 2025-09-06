import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered list
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle search input
  useEffect(() => {
    const filtered = properties.filter(
      property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Properties</h1>
      <input
        type="text"
        placeholder="Search by title or location..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="property-list">
        {filteredProperties.map(property => (
          <div key={property._id} className="property-card">
            <img src={property.image} alt={property.title} />
            <div className="property-card-content">
              <h2>{property.title}</h2>
              <p>₹{property.price.toLocaleString()}</p>
              <p>{property.location}</p>
              <Link href={`/property/${property._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}