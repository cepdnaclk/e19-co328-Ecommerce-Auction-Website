import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Typography } from '@mui/material';
import ListingService from '../../services/ListingService';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const ListingsCategory = ({ name }) => {
  // State to store item data
  const [itemData, setItemData] = useState([]);
  // State to store URL of the image
  const [url, setUrl] = useState();
  // Hook for navigation
  const navigate = useNavigate();

  // Extract query parameter from URL
  const query = new URLSearchParams(location.search);
  const cName = query.get('name');
  console.log(cName);

  // Handle bid button click, navigate to listing page with id
  const handleBid = (id) => {
    navigate(`/listing/?id=${id}`);
  }

  // Fetch data when the component mounts or cName changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get category listings from the service
        const response = await ListingService.getCategory(name);
        
        // Map the response to item data
        const newItems = response.data.map(e => ({
          id: e.id,
          title: e.title,
          img: byteArrayToImage(e.data)
        }));

        setItemData(newItems);
      } catch (error) {
        console.log(error);
        console.log("fetch error");
      }
      console.log(itemData);
    };

    fetchData();
  }, [cName]);

  // Convert byte array to image URL
  function byteArrayToImage(byte) {
    const decodedData = atob(byte);
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    setUrl(imageUrl);
    return imageUrl;
  }

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <ImageList sx={{ width: '100%' }} rowHeight={250} gap={10} cols={3}>
        {/* Render each item in the list */}
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              style={{ height: '200px' }}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={
                <Typography variant="subtitle1" sx={{ color: '#212121' }}>
                  {item.title}
                </Typography>
              }
              subtitle={item.title}
              sx={{ backgroundColor: '#e8eaf6' }}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <Button onClick={() => handleBid(item.id)} color='secondary' variant='contained'>
                    BID
                  </Button>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default ListingsCategory;
