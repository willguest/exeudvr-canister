# Ex*euδ* VR Canister Template
This is a template for deploying immersive experiences on the Internet Computer, configured for use with the [ExeuδVR Unity toolkit](https://github.com/Exeud/ExeudVR).


## 🔰 Overview

This project connects Unity's C# functionality (user interaction) to TypeScript interfaces and functions, enabling authentication and message signing from Unity to the Internet Computer. This project aims to be widely compatible, facilitating many flavours of immersive experience on the Internet Computer. It is built with:

- TypeScript everywhere, but with JavaScript compatibility.
- Node.js: Easily add JavaScript packages to extend functionality.
- Rust: Add crates with Cargo.
- Motoko: Connects to the **mops** package manager, for Web 3.0 functionality.

```js 
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UnityProvider>
          <App />
        </UnityProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
```

This repo uses Internet Identity, a WebAuthn solution configured for the Internet Computer. The implementation provides a secure context to pass messages to the blockchain, enabling crypto transactions and secure messaging, from inside Unity.


## 📦 Creating a New Project

If necessary, install [Node.js](https://nodejs.org/en/) v20.X and [dfx](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) v0.21.0.
```sh
nvm install 20
dfxvm install 0.21.0
```

From a new, empty project folder, import this template.
```sh
npx degit Exeud/exeudvr-canister
```

<img src="https://github.com/user-attachments/assets/e490610d-8660-4136-af74-855ecb8a2c9d" align="right" width="400px"/>

Open this folder in your favourite code editor and, if using Windows, connect to WSL.

Copy the files from the 'Build' folder of your Unity project to `src/assets/build`.

Run the following NPM scripts, from either the panel in the sidebar or the command line:
```sh
npm run setup # Install packages and create canisters.
npm run build # Compile ts files and build the webpack.
npm run start # Deploy canisters locally.
```

You can then open a new browser window at the location prompted by the terminal.
```
http://127.0.0.1:4943/?canisterId=<local-canister-id>
```

When ready, run `dfx deploy --network ic` to deploy your experience to the Internet Computer.


## 🛠️ Technology Stack

- [ExeudVR](https://github.com/Exeud/ExeudVR): Interactive, immersive Unity toolkit.
- [React](https://reactjs.org/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Motoko](https://github.com/dfinity/motoko#readme): a safe and simple programming language for the Internet Computer
- [Mops](https://mops.one): an on-chain community package manager for Motoko
- [mo-dev](https://github.com/dfinity/motoko-dev-server#readme): a live reload development server for Motoko


## 📚 Documentation

- [Ex*euδ*VR documentation](https://github.com/Exeud/ExeudVR/tree/develop/Documentation)
- [React quick start guide](https://react.dev/learn)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Motoko developer docs](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Mops usage instructions](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/#/docs/install)


## 💡 Tips and Tricks

- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Install a Motoko package by running `npx ic-mops add <package-name>`. Here is a [list of available packages](https://mops.one/).
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.


## 🙏 Acknowledgements

Thanks to [DFINTY](https://github.com/dfinity) for building out the Internet Computer.

Thanks to [Ryan Vandersmith](https://github.com/rvanasa) for the original [vite-react-motoko](https://github.com/rvanasa/vite-react-motoko) template, on which this is based.
