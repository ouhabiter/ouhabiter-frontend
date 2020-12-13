import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const TextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
})(Typography);

class LandingPage extends Component {
  render() {
    return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ 
          minHeight: '100vh', 
          'background-image': `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('img/marseille.jpg')` 
        }}
			>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          xs={3}
        >
          <TextTypography
            variant="h1"
            component="h1"
            gutterBottom
          >
            où habiter
          </TextTypography>
          <Link to="/app">
            <Button variant="contained" color="primary" size="large">
              Trouver ma ville
            </Button>
          </Link>
				</Grid>   
			</Grid> 
    )
  }
}

export default LandingPage;
