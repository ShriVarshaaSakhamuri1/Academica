// NotificationPreferences.js
import React, { useState } from 'react';

const NotificationPreferences = () => {
  const [notifications, setNotifications] = useState({
    email: { updates: true, marketing: false },
    sms: { updates: false, alerts: true },
    push: { alerts: true, messages: true }
  });

  const handleToggle = (type, category) => {
    setNotifications({
      ...notifications,
      [type]: { ...notifications[type], [category]: !notifications[type][category] }
    });
  };

  return (
    <div className="notification-preferences container">
      <h2>Notification Preferences</h2>

      {/* Email Notifications */}
      <div className="notification-category">
        <h3>Email Notifications</h3>
        <label>
          <input type="checkbox" checked={notifications.email.updates} onChange={() => handleToggle('email', 'updates')} />
          Receive updates via email
        </label>
        <label>
          <input type="checkbox" checked={notifications.email.marketing} onChange={() => handleToggle('email', 'marketing')} />
          Receive marketing emails
        </label>
      </div>

      {/* SMS Notifications */}
      <div className="notification-category">
        <h3>SMS Notifications</h3>
        <label>
          <input type="checkbox" checked={notifications.sms.updates} onChange={() => handleToggle('sms', 'updates')} />
          Receive updates via SMS
        </label>
        <label>
          <input type="checkbox" checked={notifications.sms.alerts} onChange={() => handleToggle('sms', 'alerts')} />
          Receive alerts via SMS
        </label>
      </div>

      {/* Push Notifications */}
      <div className="notification-category">
        <h3>Push Notifications</h3>
        <label>
          <input type="checkbox" checked={notifications.push.alerts} onChange={() => handleToggle('push', 'alerts')} />
          Receive alerts via push notifications
        </label>
        <label>
          <input type="checkbox" checked={notifications.push.messages} onChange={() => handleToggle('push', 'messages')} />
          Receive messages via push notifications
        </label>
      </div>

      <button className="save-preferences btn btn-primary">Save Preferences</button>
    </div>
  );
};

export default NotificationPreferences;
