/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

 import GoogleLogo from '../resources/google.svg'
 import Huawei from '../resources/huawei.svg'
 import VUEngineStudioScreenshot from '../resources/screenshots/vuengine-studio.png'
 import VUEngineStudioScreenshotMin from '../resources/screenshots/thumbnails/vuengine-studio-min.png'
 import RecordEvolutionScreenshot from '../resources/screenshots/record-evolution-screenshot.png'
 import RecordEvolutionScreenshotMin from '../resources/screenshots/thumbnails/record-evolution-screenshot-min.png'
 import MbedStudio from '../resources/screenshots/arm_mbedstudio-ss.png'
 import MbedStudioMin from '../resources/screenshots/thumbnails/arm_mbedstudio-ss-min.png'
 import CodeReady from '../resources/screenshots/redhat-crw-ss.png'
 import CodeReadyMin from '../resources/screenshots/thumbnails/redhat-crw-ss-min.png'
 import CoffeeEditor from '../resources/screenshots/coffeeditor.gif'
 import CoffeeEditorMin from '../resources/screenshots/thumbnails/coffeeditor-min.gif'
 import LogiCloud from '../resources/screenshots/logicloud.png'
 import LogiCloudMin from '../resources/screenshots/thumbnails/logicloud-min.png'
 import BluePrint from '../resources/screenshots/blueprint.png'
 import BluePrintMin from '../resources/screenshots/thumbnails/blueprint-min.png'
 import JonasHelming from '../resources/intros/jonas-helming.jpg'
 import MarcDumais from '../resources/intros/marc-dumais.jpg'
 import ThomasMader from '../resources/intros/thomas-mader.jpg'
 import Smartface from '../resources/screenshots/smartface.gif'
 import SmartfaceMin from '../resources/screenshots/thumbnails/smartface-min.gif'
 import CDTCloud from '../resources/screenshots/cdtcloudblueprint.gif'
 import CDTCloudMin from '../resources/screenshots/thumbnails/cdtcloudblueprint-min.gif'
 import Python from '../resources/extensions/python.png'
 import Java from '../resources/extensions/java.png'
 import GitHub from '../resources/extensions/github.png'
 import GitLens from '../resources/extensions/gitlens.png'
 import ESLint from '../resources/extensions/eslint.png'
 import NPM from '../resources/extensions/npm.png'
 import Docker from '../resources/extensions/docker.png'
 import YAML from '../resources/extensions/yaml.png'
 import Go from '../resources/extensions/go.png'
 import CodeRealTime from '../resources/screenshots/code_realtime_theia.png'
 import CodeRealTimeMin from '../resources/screenshots/thumbnails/code_realtime_theia_min.png'
 import QuickConnectStudio from '../resources/screenshots/renesas-qcstudio.png'
 import QuickConnectStudioMin from '../resources/screenshots/thumbnails/renesas-qcstudio-min.png'
 import MartiniDesigner from '../resources/screenshots/martini-designer.png'
 import MartiniDesignerMin from '../resources/screenshots/thumbnails/martini-designer-min.png'
 import MVTecHDevelopEVO from '../resources/screenshots/mvtec-hdevelopevo.png'
 import MVTecHDevelopEVOMin from '../resources/screenshots/thumbnails/mvtec-hdevelopevo-min.png'

 export const contributorsAndAdopters = [
     {
         homepage_url: "https://about.google/",
         src: GoogleLogo,
         name: "Google Logo"
     },
     {
         homepage_url: "https://www.huawei.com/",
         src: Huawei,
         name: "Huawei logo"
     }
 ]
 
 export const introsToTheia = [
     {
         title: "Getting started with Eclipse Theia",
         href: "https://youtu.be/xhSOdAJyess",
         speaker: "Jonas Helming, Theia project lead and Principal Software Architect at EclipseSource",
         src: JonasHelming,
     },
     {
         title: "Why Eclipse Theia",
         href: "https://youtu.be/xs0haWTulrY",
         speaker: "Marc Dumais, Theia project lead and Software Developer at Ericsson AB",
         src: MarcDumais,
     },
     {
         title: "How to be an Eclipse Theia Adopter",
         href: "https://youtu.be/SPO8pudgJak",
         speaker: "Jonas Helming, Theia project lead and Principal Software Architect at EclipseSource",
         src: JonasHelming,
     },
     {
         title: "The Eclipse Theia Architecture",
         href: "https://youtu.be/KN2JUsFuEhU",
         speaker: "Thomas Mäder, Theia project lead and Principal Software Developer at Red Hat",
         src: ThomasMader,
     }
 ]
 
 export const products = [
     {
         href: "https://os.mbed.com/studio/",
         src: MbedStudio,
         thumb: MbedStudioMin,
         alt: "Mbed Studio by Arm"
     },
     {
         href: "https://eclipse.dev/cdt-cloud/",
         src: CDTCloud,
         thumb: CDTCloudMin,
         alt: "CDT Cloud Blueprint"
     },
     {
         href: "https://www.eclipse.dev/emfcloud/#coffeeeditoroverview",
         src: CoffeeEditor,
         thumb: CoffeeEditorMin,
         alt: "Coffee Editor Example by EclipseSource"
     },
     {
         href: "https://www.neuron-automation.eu/engineering-toolkit/your-automation-toolchain/logi-cloud",
         src: LogiCloud,
         thumb: LogiCloudMin,
         alt: "logi.cloud by logi.cals"
     },
     {
         href: "https://theia-ide.org/#theiaide",
         src: BluePrint,
         thumb: BluePrintMin,
         alt: "Theia IDE"
     },
     {
         href: "https://www.record-evolution.de/reswarm",
         src: RecordEvolutionScreenshot,
         thumb: RecordEvolutionScreenshotMin,
         alt: "Record Evolution Screenshot"
     },
     {
         href: "https://www.vuengine.dev",
         src: VUEngineStudioScreenshot,
         thumb: VUEngineStudioScreenshotMin,
         alt: "VUEngine Studio"
     },
     {
         href: "https://smartface.io",
         src: Smartface,
         thumb: SmartfaceMin,
         alt: "Smartface"
     },
     {
        href: "https://secure-dev-ops.github.io/code-realtime",
        src: CodeRealTime,
        thumb: CodeRealTimeMin,
        alt: "Code RealTime"
    },
    {
        href: "https://www.renesas.com/qcstudio",
        src:   QuickConnectStudio,
        thumb: QuickConnectStudioMin,
        alt: "QuickConnect Studio"
    },
    {
        href: "https://developers.redhat.com/products/codeready-workspaces/overview",
        src: CodeReady,
        thumb: CodeReadyMin,
        alt: "Red Hat CodeReady Workspaces"
    },
    {
        href: "https://www.lonti.com/martini",
        src: MartiniDesigner,
        thumb: MartiniDesignerMin,
        alt: "Martini Designer"
    },
    {
        href: "https://www.mvtec.com/products/halcon/work-with-halcon/hdevelopevo",
        src: MVTecHDevelopEVO,
        thumb: MVTecHDevelopEVOMin,
        alt: "MVTec HDevelopEVO"
    }
 ]

 export const extensions = [
    {
        href: "https://open-vsx.org/extension/ms-python/python",
        thumb: Python,
        alt: "Python"
    },
    {
        href: "https://open-vsx.org/extension/redhat/java",
        thumb: Java,
        alt: "Language support for Java"
    },
    {
        href: "https://open-vsx.org/extension/GitHub/vscode-pull-request-github",
        thumb: GitHub,
        alt: "GitHub Pull Requests and Issues"
    },
    {
        href: "https://open-vsx.org/extension/eamodio/gitlens",
        thumb: GitLens,
        alt: "GitLens — Git supercharged"
    },
    {
        href: "https://open-vsx.org/extension/dbaeumer/vscode-eslint",
        thumb: ESLint,
        alt: "ESLint"
    },
    {
        href: "https://open-vsx.org/extension/vscode/npm",
        thumb: NPM,
        alt: "NPM Support"
    },
    {
        href: "https://open-vsx.org/extension/ms-azuretools/vscode-docker",
        thumb: Docker,
        alt: "Docker"
    },
    {
        href: "https://open-vsx.org/extension/redhat/vscode-yaml",
        thumb: YAML,
        alt: "YAML"
    },
    {
        href: "https://open-vsx.org/extension/golang/Go",
        thumb: Go,
        alt: "Go"
    }
]
 
