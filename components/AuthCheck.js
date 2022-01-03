import React from 'react';
import Link from "next/link";

import { UserContext } from '../lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = React.useContext(UserContext);

  return username ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
}