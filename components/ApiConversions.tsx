const sendFacebookEvent = async () => {
    try {
      const response = await fetch('/api/fb-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          user_data: {
            em: 'hashed_email@example.com',
            ph: 'hashed_phone_number', 
          },
        }),
      });
  
      const result = await response.json();
      console.log('Facebook Event Sent:', result);
    } catch (error) {
      console.error('Error sending Facebook event:', error);
    }
  };
  