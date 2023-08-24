import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// aşağıdaki kodu index.html ye eklemeyi unutma ve "key ini yaz" yoksa Autocomplete çalışmaz
/*  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=<key>"></script> */
import useStyles from './styles'

const Header = ({setCoordinates}) => {
  const classes = useStyles()
  const [autocomplete, setAutocomplete] = useState(null)

  const onLoad = (autoC) => {
    setAutocomplete(autoC)
  }
  const onPlaceChanged = () => {
      // aşağıdaki kod için google map doc a bak
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
      setCoordinates({lat,lng})

}

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Box className={classes.search}>
              <Box className={classes.searchIcon}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder='Search...'
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </Box>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
