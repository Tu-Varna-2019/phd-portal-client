# 🎓 Designing and implementing a Doctoral Admission and Training System 🎓

[![License](https://img.shields.io/github/license/Tu-Varna-2019/phd-portal-client)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![Dependabot Updates](https://github.com/Tu-Varna-2019/phd-portal-client/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/Tu-Varna-2019/phd-portal-server/actions/workflows/dependabot/dependabot-updates)
[![Create and publish a Docker image](https://github.com/Tu-Varna-2019/phd-portal-client/actions/workflows/docker-publish.yaml/badge.svg)](https://github.com/Tu-Varna-2019/phd-portal-server/actions/workflows/docker-publish.yaml)
[![Security scanning](https://github.com/Tu-Varna-2019/phd-portal-client/actions/workflows/security-scan.yaml/badge.svg)](https://github.com/Tu-Varna-2019/phd-portal-server/actions/workflows/security-scan.yaml)
[![Test](https://github.com/Tu-Varna-2019/phd-portal-client/actions/workflows/test.yaml/badge.svg)](https://github.com/Tu-Varna-2019/phd-portal-server/actions/workflows/test.yaml)
[![GitHub release](https://img.shields.io/github/v/release/Tu-Varna-2019/phd-portal-client)](#)
[![GitHub release date](https://img.shields.io/github/release-date/Tu-Varna-2019/phd-portal-client)](#)
[![itHub last commit](https://img.shields.io/github/last-commit/Tu-Varna-2019/phd-portal-client)](#)

## 🚀 About

The project should develop an engineering solution for digitizing an information system for doctoral students and candidates in order to be used by higher education institutions, which would integrate into the systematic process for the management and management of the so -called "digital university".

## 🎉 Getting started

### ✅ Prerequisites

In order to run the app, make sure you have installed the following dependencies

| Program |                     URL                     |
| :------ | :-----------------------------------------: |
| NodeJs  | [NodeJs](https://www.java.com/en/download/) |

> If you are using Nix or NixOS you can install them in flake.nix via _devenv_

### 🌱 Setup

1. Add your env vars in `.env` file.

### 🏗️ Build via Docker

```sh
docker build -t IliyanKostov9/phd-client:1.0.0 .
# Or
make docker-build
```

### 🛠️ Install the deps

```sh
pnpm i
# Or
make install
```

### 🏃 Run

```sh
pnpm run dev --experimental-https
# Or
make run
```

## 🧑‍💻 Commands

| Command             | Description                                    |
| :------------------ | :--------------------------------------------- |
| make help           | Show available commands with their description |
| make all            | Run all commands at once                       |
| make run            | Run the app                                    |
| make test           | Run tests                                      |
| make cypress        | Run e2e tests                                  |
| make clean          | Uninstall the deps                             |
| make install        | Install the deps                               |
| make elastic-attach | Attach to the Elastic search TUI via _devenv_  |

#### 📚 Docs

- [ Javascript ](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ ReactJS ](https://react.dev/)
- [ NextJS ](https://nextjs.org/docs)
- [ Docker ](https://docs.docker.com/)
- [ Nix ](https://nix.dev/manual/nix/2.18/)
- [ MaterialUI ](https://mui.com/)

### 📃 License

This product is licensed under [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html)
