# ICVR - React
This is a template for deploying Unity WebXR scenes on the Internet Computer.

This project, which should be considered a work in progress, connects Unity's C# functionality to a React and TypeScript, allowing you to pass signed messages from Unity to the Internet Computer. This project hopes to enable as many people as possible to build immersive experiences on the Internet Computer, and is compatible with:

- Node.js: Easily add JavaScript packages to extend functionality
- Rust: Add crates with Cargo.
- Motoko: Connects to the **mops** package manager, for Web 3.0 functionality.

This repo also integrates Internet Identity, a WebAuthn solution configured for the Internet Computer. The implementation provides a secure context to pass messages to the blockchain, enabling crypto transactions and secure messaging, from inside Unity. 

## 📦 Create a New Project

Make sure that [Node.js](https://nodejs.org/en/) `>= 20` and [dfx](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed on your system.

Beginning with a new, empty project directory:

Import the project and start dfx with the following commands:

```sh
npx degit willguest/icvr-react # Download this starter project
dfx start --clean --background # Run dfx in the background
```

<img src="https://github.com/willguest/icvr-react/assets/24574013/27ba3209-bcec-4fc3-aaa5-5156bca28a9d" align="right" width="400px"/>
Add the Unity build:

  - Currently only supports uncompressed builds. \
    Support for gzip will be added soon.
    
  - Make sure the Unity build is called `unity_build`. \
    If another name is used, update `UnityInterface.tsx`.
    
  - Copy the files from the 'Build' folder into `src/assets/build`.


Enter the following commands, which reference NPM scripts:

```sh
npm run setup # Install packages, deploy canisters, and generate type bindings
npm run build # Compiles TypeScript files and builds the webpack.
npm run start # Deploys local dependency canisters and runs the front- and back-end in parallel.
```

You can then open a new browser window at location prompted by the terminal
  `http://127.0.0.1:4943/?canisterId=<local-canister-id>`

When ready, run `dfx deploy --network ic` to deploy your application to the Internet Computer.

## 🛠️ Technology Stack
- [ICVR](https://github.com/willguest/ICVR): Interactive, immersive Unity toolkit for the World Computer.
- [React](https://reactjs.org/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Motoko](https://github.com/dfinity/motoko#readme): a safe and simple programming language for the Internet Computer
- [Mops](https://mops.one): an on-chain community package manager for Motoko
- [mo-dev](https://github.com/dfinity/motoko-dev-server#readme): a live reload development server for Motoko

## 📚 Documentation

- [ICVR documentation](https://github.com/willguest/ICVR/tree/develop/Documentation)
- [React quick start guide](https://react.dev/learn)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Motoko developer docs](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Mops usage instructions](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/#/docs/install)

## 💡 Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Install a Motoko package by running `npx ic-mops add <package-name>`. Here is a [list of available packages](https://mops.one/).
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.


## 🙏 Acknowledgements

Thanks to [DFINTY](https://github.com/dfinity) for building out the World Computer.

Thanks to [Ryan Vandersmith](https://github.com/rvanasa) for the original [vite-react-motoko](https://github.com/rvanasa/vite-react-motoko) template, on which this is based.
