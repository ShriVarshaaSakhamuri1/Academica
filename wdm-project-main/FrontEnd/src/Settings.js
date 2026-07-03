import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AccountSettings from './AccountSettings';
import NotificationPreferences from './NotificationPreferences';
import "./Settings.css"
// import PlatformPreferences from './PlatformPreferences';

const Settings = () => {
  return (
    <div className="settings-container container">
      <nav>
        <ul>
          <li>
            <Link to="/account-settings">Account Settings</Link>
          </li>
          <li>
            <Link to="/notification-preferences">Notification Preferences</Link>
          </li>
          <li>
            <Link to="/platform-preferences">Platform Preferences</Link>
          </li>
        </ul>
      </nav>

      <div className="settings-content">
        <Routes>
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/notification-preferences" element={<NotificationPreferences />} />
          {/* <Route path="/platform-preferences" element={<PlatformPreferences />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
