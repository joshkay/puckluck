import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const UserNavigation = () => {
  return (
    <div>
      <Link href="/register">
        <Button color="inherit">
          Register
        </Button>
      </Link>
      <Link href="/login">
        <Button color="inherit">
          Login
        </Button>
      </Link>
    </div>
  );
}

export default UserNavigation;