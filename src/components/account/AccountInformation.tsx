import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navigateHelper } from '../../utils/navigateHelper';
import { useNavigate } from 'react-router-dom';
import { AccountInformation_viewer } from './__generated__/AccountInformation_viewer.graphql';
import Settings from '@mui/icons-material/Settings';
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

const styles = theme =>
  createStyles({
    authButton: {
      color: theme.palette.primary.contrastText,
      marginLeft: 10,
    },
  });

interface Props extends WithStyles<typeof styles> {
  viewer: AccountInformation_viewer;
}

function AccountInformation(props: Props) {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let { viewer, classes } = props;

  if (!viewer) {
    return (
      <Button
        className={classes.authButton}
        startIcon={<GitHubIcon />}
        href="https://api.cirrus-ci.com/redirect/auth/github"
      >
        Sign in
      </Button>
    );
  }
  return (
    <div>
      <IconButton
        aria-label="menu"
        aria-owns={anchorEl ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
      >
        <Avatar style={{ cursor: 'pointer' }} src={viewer.avatarURL} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={event => {
            handleClose();
            navigateHelper(navigate, event, '/settings/profile/');
          }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </MenuItem>
        <MenuItem
          onClick={event => {
            handleClose();
            navigateHelper(navigate, event, 'https://api.cirrus-ci.com/redirect/logout/');
          }}
        >
          <ListItemIcon>
            <DirectionsRun />
          </ListItemIcon>
          <ListItemText inset primary="Log Out" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default createFragmentContainer(withStyles(styles)(AccountInformation), {
  viewer: graphql`
    fragment AccountInformation_viewer on User {
      avatarURL
    }
  `,
});
