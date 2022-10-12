import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

type Props = {
  user: boolean;
};

const Layout = ({ user }: Props) => {
  const [resized, setResized] = useState(false);
  const [mobile, setMobile] = useState<boolean>(true);

  useEffect(() => {
    if (window.innerWidth < 700) {
      setMobile(true);
    } else if (window.innerWidth > 700) {
      setMobile(false);
    }

    window.onresize = () => {
      if (window.innerWidth < 700 && mobile === false) {
        setMobile(true);
      } else if (window.innerWidth > 700 && mobile === true) {
        setMobile(false);
      }
    };
  }, [mobile]);

  if (mobile) {
    return (
      <div className="layout-container-mobile">
        <NavBar />
        <div className="layout-content-mobile">
          <Outlet />
        </div>
      </div>
    );
  }
  return (
    <div className="layout-container">
      <SideBar user={user} resized={resized} setResized={setResized} />
      <div
        className={resized ? 'layout-content layout-resized' : 'layout-content'}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
