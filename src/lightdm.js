
const DEBUG_PASSWORD = 'abc123';

window.lightdm_debug = window.lightdm === undefined;

if(window.lightdm_debug) {
  window.greeter_config = {
      branding: {
          background_images: 'no where this is live test'
      }
  };

  window.lightdm = {
      is_authenticated: false,
      authentication_user: undefined,
      default_session: 'plasma-shell',
      can_suspend: true,
      can_hibernate: true,
      sessions: [
          {
              name: 'KDE 5',
              key: 'plasma-shell'
          },
          {
              name: 'Gnome 3',
              key: 'gnome-shell'
          },
          {
              name: 'XFCE 4',
              key: 'xfce'
          },
          {
              name: 'Cinnamon',
              key: 'cinnamon'
          },
          {
              name: 'i3wm',
              key: 'i3'
          },
          {
              name: 'awesome wm',
              key: 'awesome'
          },
          {
              name: 'xmonad',
              key: 'xmonad'
          }
      ],
      users: [{
          display_name: 'John Doe',
          username: 'johnd'
      }, {
          display_name: 'Adrien Navratil',
          username: 'litarvan',
          image: 'litarvan'
      }],
      languages: [{
          name: 'American English',
          code: 'en_US.utf8'
      }, {
          name: 'Français',
          code: 'fr_FR.utf8'
      }],
      language: 'American English',
      start_authentication: (username) => {
          console.log(`Starting authenticating : '${username}'`);
          lightdm.authentication_user = username;

          show_prompt("Password: ");
      },
      cancel_authentication: () => {
          console.log('Auth cancelled');
      },
      respond: (password) => {
          console.log(`Password provided : '${password}'`);

          if (password === DEBUG_PASSWORD)
          {
              lightdm.is_authenticated = true;
          }
          else
          {
              let now = new Date().getTime();
              while (new Date().getTime() < now + 2000);
          }

          authentication_complete();
      },
      login: (user, session) => {
          alert(`Logged with '${user}' (Session: '${session}') !`);
      },
      shutdown: () => {
          alert('(DEBUG: System is shutting down)')
      },
      hibernate: () => {
          alert('(DEBUG: System is hibernating)')
      },
      suspend: () => {
          alert('(DEBUG: System is suspending)')
      },
      restart: () => {
          alert('(DEBUG: System is rebooting)')
      }
  };
}

let completedCallback;
let errorCallback;
let password;

window.lightdm_login = ({ username, password, onComplete, onError }) => {
  completedCallback = onComplete;
  errorCallback = onError;
  password = password;

  lightdm.authenticate(username);
}

window.lightdm_start = desktop => 
  lightdm.login(lightdm.authentication_user, desktop);

window.show_prompt = (text, type) =>
  text === "Password: " && lightdm.respond(password);

window.authentication_complete = () => {
  if(lightdm.is_authenticated) {
    completedCallback();
  } else {
    lightdm.cancel_authentication();
    errorCallback('Invalid username/password');
  }
}

window.show_message = (text, type) => {
  errorCallback(text);
}