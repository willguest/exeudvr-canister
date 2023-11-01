# ICVR - React
Welcome to the **icvr-react** template, for building Unity WebXR scenes on the Internet Computer. This project, which should be considered a work in progress, connects Unity's C# functionality to a React-based, TypeScript module capable of passing signed messages on the Internet Computer. JavaScript and Rust can be used alongside this, as can the the Motoko package manager (mops), giving easy access to additional resources on the World Computer.

This repo uses Internet Identity, a WebAuthn solution configured for the Internet Computer, providing a secure context to pass messages to the blockchain, enabling crypto transactions and secure messaging from inside Unity. 

## 📦 Create a New Project

Make sure that [Node.js](https://nodejs.org/en/) `>= 16` and [dfx](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed on your system.

Beginning with a new, empty project directory:

Import the project and start dfx with the following commands:

```sh
npx degit willguest/icvr-react # Download this starter project
dfx start --clean --background # Run dfx in the background
```

Add the Unity build:
  - Currently only supports uncompressed builds. Support for gzip will be added soon
  - Make sure the Unity build was called `unity_build`. If another name is used, update `UnityInterface.tsx`.
  - Place the files in `src/assets/build`.

Enter the following commands, which can also be found in the *NPM SCRIPTS* VS Code sidebar

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
