import GridLayout from './GridLayout'
import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu'

export default function Top() {
  return (
    <div>
      <SideMenu />
      <GridLayout />
    </div>
  );
}
