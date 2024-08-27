# Ex*euδ* VR Canister Template
This is a template for deploying immersive experiences on the Internet Computer, configured for use with the [ExeuδVR Unity toolkit](https://github.com/willguest/ExeudVR).

This project connects Unity's C# functionality (user interaction) to TypeScript interfaces and functions, enabling authentication and message signing from Unity to the Internet Computer. This project aims to be widely compatible, facilitating many flavours of immersive experience on the Internet Computer. It is built with:

- TypeScript everywhere, but with JavaScript compatibility.
- Node.js: Easily add JavaScript packages to extend functionality.
- Rust: Add crates with Cargo.
- Motoko: Connects to the **mops** package manager, for Web 3.0 functionality.

This repo also uses Internet Identity, a WebAuthn solution configured for the Internet Computer. The implementation provides a secure context to pass messages to the blockchain, enabling crypto transactions and secure messaging, from inside Unity. 

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

## 📦 Creating a New Project

Make sure that [Node.js](https://nodejs.org/en/) `>= 20` and [dfx](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed on your system.

Beginning with a new, empty project directory:

Import the project and start dfx with the following commands:

```sh
npx degit willguest/exeudvr-canister # Download this template
dfx start --clean --background # Run dfx in the background
```

<img src="https://github.com/user-attachments/assets/e490610d-8660-4136-af74-855ecb8a2c9d" align="right" width="400px"/>
Add the Unity build:

  - Currently ExeudVR only supports uncompressed builds. 
    
  - Make sure the Unity build is called `unity_build`. \
    If another name is used, update `UnityInterface.tsx`.
    
  - Copy the files from the 'Build' folder into `src/assets/build`.


Enter the following commands, which reference NPM scripts:

```sh
npm run setup # Install packages, deploy canisters, and generate type bindings
npm run build # Compiles TypeScript files and builds the webpack.
npm run start # Deploys local dependency canisters and runs the front- and back-end in parallel.
```

You can then open a new browser window at the location prompted by the terminal.
  `http://127.0.0.1:4943/?canisterId=<local-canister-id>`

When ready, run `dfx deploy --network ic` to deploy your application to the Internet Computer.

## 🛠️ Technology Stack
- [ExeudVR](https://github.com/willguest/ExeudVR): Interactive, immersive Unity toolkit.
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

## 💛 Sponsorship

The framework is open-source and was initially funded by non-dilutive grants from the Internet Computer. I welcome sponsorship in all forms and look forward to scaling this project as more resources become available. Please visit my [sponsorship page](https://github.com/sponsors/willguest) for more information.

## 🙏 Acknowledgements

Thanks to [DFINTY](https://github.com/dfinity) for building out the Internet Computer.

Thanks to [Ryan Vandersmith](https://github.com/rvanasa) for the original [vite-react-motoko](https://github.com/rvanasa/vite-react-motoko) template, on which this is based.
