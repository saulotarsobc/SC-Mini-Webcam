# Mini Webcam - (Electronjs)

## ***Mini Webcam*** feito com electronjs. Com gravação de posições e tamanhos e atalhos.

<div align="center">
    <img src="./img/banner2.png" alt="banner">
</div>

## Funções

- 1 - Mudar para cena 1 (CTRL+1)
- 2 - Mudar para cena 2 (CTRL+2)
- 3 - Gravar a posição 1
- 4 - Gravar a posição 2
- 5 - Aumentar do frame da câmera
- 6 - Diminuir do frame da câmera
- 7 - Fechar aplicação

<hr>

## Como rodar?

```sh
git clone https://github.com/saulotarsobc/mini_webcam.git
cd mini_webcam
npm install
npm start
```

<hr>

## Instalador para windows

```sh
electron-builder --win
## ou
npm run pack-win
## execultavel na padara 'dist'
```

<hr>

## Referências

- [Ícones](https://fontawesome.com/icons)
- [How do I get the OS window position in electron?](https://stackoverflow.com/questions/55564783/how-do-i-get-the-os-window-position-in-electron)
- [Elctronjs DOC - setPosition](https://www.electronjs.org/de/docs/latest/api/browser-window#winsetpositionx-y-animate)
- [Elctronjs DOC - globalShortcut](https://www.electronjs.org/docs/latest/api/global-shortcut)
- [Master Electron: BrowserWindow - Parent & Child Windows](https://youtu.be/l75UxvoRyI4)
