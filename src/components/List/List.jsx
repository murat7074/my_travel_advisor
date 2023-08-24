import React, { useState, useEffect, createRef } from 'react'
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from '@material-ui/core'

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import useStyles from './styles.js'

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  // console.log({childClicked}); ( childClicked 5)
  const classes = useStyles()

  const [elRefs, setElRefs] = useState([])

 

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])

  return (
    <Box className={classes.container}>
      <Typography variant='h4'>Food & Dining around you</Typography>
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress size='5rem' />
        </Box>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id='type'>Type</InputLabel>
            <Select
              id='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id='rating'>Rating</InputLabel>
            <Select
              id='rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='3'>Above 3.0</MenuItem>
              <MenuItem value='4'>Above 4.0</MenuItem>
              <MenuItem value='4.5'>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails

                /* tıklandığında ilgili kartı PlaceDetails e göndereceğiz */
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default List
