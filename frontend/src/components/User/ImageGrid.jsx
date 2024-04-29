import React from 'react'
import { Grid } from '@mui/material'

const ImageGrid = ({images}) => {
  return (
    <Grid container direction="column" sx={{height:'500px', backgroundColor:''}}>
        {images.map(image=> {
            <img src={image} style={{cursor:"pointer"}}/>
        })}
    </Grid>
  )
}

export default ImageGrid