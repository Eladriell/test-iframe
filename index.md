<html>
<head>
  <script>
    let channelId = undefined;
    function sendMessage(message) {
      window.parent.postMessage({...message, channelId}, '*');
    }

    try {
      const received = [];
      if (window.parent) {
        window.addEventListener('message', (event) => {
          received.push(JSON.stringify(event.data));
          document.getElementById('content').innerText = received.join('\n');

          switch(event.data.action) {
            case 'PARENT_LOAD':
              sendMessage({action: 'LOAD', version: '1.0'});
            break;
            case 'EXPECT_RESPONSE':
              setTimeout(() => {
                sendMessage({action: 'DOESNT MATTER', version: '1.0', id: event.data.id});
              }, 600);
              break;
            case 'HANDSHAKE_PARENT':
              channelId = event.data.channelId;
              sendMessage({action: 'HANDSHAKE_CHILD', version: '1.0', id: event.data.id});
              break;
          }
        });
      }
    } catch(e) {
      console.error('Cant access parent window');
    }
  </script>
</head>

<body>
<div>
  <button onclick="sendMessage({action: 'BUTTON_EVENT', version: '1.0', data: 'random data'})">Send event</button>
  <span>Messages received:</span>
  <pre id='content'></pre>
</div>
</body>
</html>
