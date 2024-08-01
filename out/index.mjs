// src/eventEmitter.ts
var EventEmitter = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.register = this._register.bind(this);
  }
  _register(listener) {
    this.listeners.add(listener);
    return {
      dispose: () => {
        this.listeners.delete(listener);
      }
    };
  }
  fire(arg) {
    for (const listener of this.listeners) {
      try {
        listener(arg);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

// src/utils.ts
var BS = 8;
var TAB = 9;
var NL = 10;
var CR = 13;
var SP = 32;
var isalnum = (c) => 48 <= c && c <= 57 || 65 <= c && c <= 90 || c == 95 || 97 <= c && c <= 122;
var iscntrl = (c) => 0 <= c && c <= 31 && c != 9 || c == 127;
var isUtf8ContinuationByte = (c) => (c & 192) == 128;
var tolower = (c) => 65 <= c && c <= 90 ? c + 32 : c;
var toupper = (c) => 97 <= c && c <= 122 ? c - 32 : c;
var utf8Encoder = new TextEncoder();
var stringToUtf8Bytes = (str) => Array.from(utf8Encoder.encode(str));

// src/termios.ts
var Flags = /* @__PURE__ */ ((Flags2) => {
  Flags2[Flags2["ISTRIP"] = 32] = "ISTRIP";
  Flags2[Flags2["INLCR"] = 64] = "INLCR";
  Flags2[Flags2["IGNCR"] = 128] = "IGNCR";
  Flags2[Flags2["ICRNL"] = 256] = "ICRNL";
  Flags2[Flags2["IUCLC"] = 512] = "IUCLC";
  Flags2[Flags2["IXON"] = 1024] = "IXON";
  Flags2[Flags2["IXANY"] = 2048] = "IXANY";
  Flags2[Flags2["IMAXBEL"] = 8192] = "IMAXBEL";
  Flags2[Flags2["IUTF8"] = 16384] = "IUTF8";
  Flags2[Flags2["OPOST"] = 1] = "OPOST";
  Flags2[Flags2["OLCUC"] = 2] = "OLCUC";
  Flags2[Flags2["ONLCR"] = 4] = "ONLCR";
  Flags2[Flags2["OCRNL"] = 8] = "OCRNL";
  Flags2[Flags2["ONOCR"] = 16] = "ONOCR";
  Flags2[Flags2["ONLRET"] = 32] = "ONLRET";
  Flags2[Flags2["TABDLY"] = 6144] = "TABDLY";
  Flags2[Flags2["XTABS"] = 6144] = "XTABS";
  Flags2[Flags2["ISIG"] = 1] = "ISIG";
  Flags2[Flags2["ICANON"] = 2] = "ICANON";
  Flags2[Flags2["ECHO"] = 8] = "ECHO";
  Flags2[Flags2["ECHOE"] = 16] = "ECHOE";
  Flags2[Flags2["ECHOK"] = 32] = "ECHOK";
  Flags2[Flags2["ECHONL"] = 64] = "ECHONL";
  Flags2[Flags2["NOFLSH"] = 128] = "NOFLSH";
  Flags2[Flags2["ECHOCTL"] = 512] = "ECHOCTL";
  Flags2[Flags2["ECHOPRT"] = 1024] = "ECHOPRT";
  Flags2[Flags2["ECHOKE"] = 2048] = "ECHOKE";
  Flags2[Flags2["IEXTEN"] = 32768] = "IEXTEN";
  Flags2[Flags2["VINTR"] = 0] = "VINTR";
  Flags2[Flags2["VQUIT"] = 1] = "VQUIT";
  Flags2[Flags2["VERASE"] = 2] = "VERASE";
  Flags2[Flags2["VKILL"] = 3] = "VKILL";
  Flags2[Flags2["VEOF"] = 4] = "VEOF";
  Flags2[Flags2["VTIME"] = 5] = "VTIME";
  Flags2[Flags2["VMIN"] = 6] = "VMIN";
  Flags2[Flags2["VSWTCH"] = 7] = "VSWTCH";
  Flags2[Flags2["VSTART"] = 8] = "VSTART";
  Flags2[Flags2["VSTOP"] = 9] = "VSTOP";
  Flags2[Flags2["VSUSP"] = 10] = "VSUSP";
  Flags2[Flags2["VEOL"] = 11] = "VEOL";
  Flags2[Flags2["VREPRINT"] = 12] = "VREPRINT";
  Flags2[Flags2["VDISCARD"] = 13] = "VDISCARD";
  Flags2[Flags2["VWERASE"] = 14] = "VWERASE";
  Flags2[Flags2["VLNEXT"] = 15] = "VLNEXT";
  Flags2[Flags2["VEOL2"] = 16] = "VEOL2";
  return Flags2;
})(Flags || {});
var Termios = class _Termios {
  constructor(iflag, oflag, cflag, lflag, cc) {
    this.iflag = iflag;
    this.oflag = oflag;
    this.cflag = cflag;
    this.lflag = lflag;
    this.cc = cc;
    this.ISTRIP_P = (this.iflag & 32 /* ISTRIP */) != 0;
    this.INLCR_P = (this.iflag & 64 /* INLCR */) != 0;
    this.IGNCR_P = (this.iflag & 128 /* IGNCR */) != 0;
    this.ICRNL_P = (this.iflag & 256 /* ICRNL */) != 0;
    this.IUCLC_P = (this.iflag & 512 /* IUCLC */) != 0;
    this.IXON_P = (this.iflag & 1024 /* IXON */) != 0;
    this.IXANY_P = (this.iflag & 2048 /* IXANY */) != 0;
    this.IUTF8_P = (this.iflag & 16384 /* IUTF8 */) != 0;
    this.OPOST_P = (this.oflag & 1 /* OPOST */) != 0;
    this.OLCUC_P = (this.oflag & 2 /* OLCUC */) != 0;
    this.ONLCR_P = (this.oflag & 4 /* ONLCR */) != 0;
    this.OCRNL_P = (this.oflag & 8 /* OCRNL */) != 0;
    this.ONOCR_P = (this.oflag & 16 /* ONOCR */) != 0;
    this.ONLRET_P = (this.oflag & 32 /* ONLRET */) != 0;
    this.TABDLY_XTABS_P = (this.oflag & 6144 /* TABDLY */) == 6144 /* XTABS */;
    this.ISIG_P = (this.lflag & 1 /* ISIG */) != 0;
    this.ICANON_P = (this.lflag & 2 /* ICANON */) != 0;
    this.ECHO_P = (this.lflag & 8 /* ECHO */) != 0;
    this.ECHOE_P = (this.lflag & 16 /* ECHOE */) != 0;
    this.ECHOK_P = (this.lflag & 32 /* ECHOK */) != 0;
    this.ECHONL_P = (this.lflag & 64 /* ECHONL */) != 0;
    this.NOFLSH_P = (this.lflag & 128 /* NOFLSH */) != 0;
    this.ECHOCTL_P = (this.lflag & 512 /* ECHOCTL */) != 0;
    this.ECHOPRT_P = (this.lflag & 1024 /* ECHOPRT */) != 0;
    this.ECHOKE_P = (this.lflag & 2048 /* ECHOKE */) != 0;
    this.IEXTEN_P = (this.lflag & 32768 /* IEXTEN */) != 0;
    this.INTR_V = this.cc[0 /* VINTR */];
    this.QUIT_V = this.cc[1 /* VQUIT */];
    this.ERASE_V = this.cc[2 /* VERASE */];
    this.KILL_V = this.cc[3 /* VKILL */];
    this.EOF_V = this.cc[4 /* VEOF */];
    this.TIME_V = this.cc[5 /* VTIME */];
    this.MIN_V = this.cc[6 /* VMIN */];
    this.SWTCH_V = this.cc[7 /* VSWTCH */];
    this.START_V = this.cc[8 /* VSTART */];
    this.STOP_V = this.cc[9 /* VSTOP */];
    this.SUSP_V = this.cc[10 /* VSUSP */];
    this.EOL_V = this.cc[11 /* VEOL */];
    this.REPRINT_V = this.cc[12 /* VREPRINT */];
    this.DISCARD_V = this.cc[13 /* VDISCARD */];
    this.WERASE_V = this.cc[14 /* VWERASE */];
    this.LNEXT_V = this.cc[15 /* VLNEXT */];
    this.EOL2_V = this.cc[16 /* VEOL2 */];
  }
  static fromConfig(config) {
    return new _Termios(
      config.iflag,
      config.oflag,
      config.cflag,
      config.lflag,
      config.cc
    );
  }
  clone() {
    return _Termios.fromConfig(this);
  }
};
var defaultTermios = new Termios(
  256 /* ICRNL */ | 1024 /* IXON */ | 8192 /* IMAXBEL */ | 16384 /* IUTF8 */,
  1 /* OPOST */ | 4 /* ONLCR */,
  191,
  // c_cflag is not supported
  1 /* ISIG */ | 2 /* ICANON */ | 8 /* ECHO */ | 16 /* ECHOE */ | 32 /* ECHOK */ | 512 /* ECHOCTL */ | 2048 /* ECHOKE */ | 32768 /* IEXTEN */,
  [
    3,
    28,
    127,
    21,
    4,
    0,
    1,
    0,
    17,
    19,
    26,
    0,
    18,
    15,
    23,
    22,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
);

// src/lineDiscipline.ts
var LineDiscipline = class {
  // flushed after NL is input (in ICANON mode)
  constructor() {
    // callbacks
    this._onWriteToLower = new EventEmitter();
    this.onWriteToLower = this._onWriteToLower.register;
    this._onWriteToUpper = new EventEmitter();
    this.onWriteToUpper = this._onWriteToUpper.register;
    this._onSignalToUpper = new EventEmitter();
    this.onSignalToUpper = this._onSignalToUpper.register;
    this._onFlowActivated = new EventEmitter();
    this.onFlowActivated = this._onFlowActivated.register;
    this._onFlowDeactivated = new EventEmitter();
    this.onFlowDeactivated = this._onFlowDeactivated.register;
    // states
    this.T = defaultTermios;
    this.keyActions = new Array(256).fill("normal");
    this.flowActivated = true;
    // false after VSTOP (C-s), true after VSTART (C-q)
    this.column = 0;
    // the column that the cursor is in
    this.baseColumn = 0;
    // the column that starts the to-upper buffer
    this.vlnext = false;
    // waiting for the next character after VLNEXT (C-v)
    this.echoprt = false;
    // erasing with ECHOPRT
    this.toLowerBuf = [];
    // flushed immediately every call
    this.toUpperBuf = [];
    this.termios = defaultTermios;
  }
  activateFlow() {
    this.flowActivated = true;
    this._onFlowActivated.fire();
  }
  deactivateFlow() {
    this.flowActivated = false;
    this._onFlowDeactivated.fire();
  }
  get flow() {
    return this.flowActivated;
  }
  get termios() {
    return this.T;
  }
  set termios(T) {
    this.T = T;
    const keyActions = new Array(256).fill("normal");
    if (T.ICANON_P) {
      keyActions[T.EOF_V] = "VEOF";
      keyActions[T.EOL_V] = "VEOL";
      keyActions[T.EOL2_V] = "VEOL";
      keyActions[T.ERASE_V] = "VERASE";
      keyActions[T.KILL_V] = "VKILL";
      if (T.IEXTEN_P) {
        keyActions[T.REPRINT_V] = "VREPRINT";
        keyActions[T.WERASE_V] = "VWERASE";
      }
    }
    if (T.IEXTEN_P) {
      keyActions[T.LNEXT_V] = "VLNEXT";
    }
    if (T.IXON_P) {
      keyActions[T.START_V] = "VSTART";
      keyActions[T.STOP_V] = "VSTOP";
    }
    if (T.ISIG_P) {
      keyActions[T.INTR_V] = "VINTR";
      keyActions[T.QUIT_V] = "VQUIT";
      keyActions[T.SUSP_V] = "VSUSP";
    }
    keyActions[0] = "normal";
    this.keyActions = keyActions;
    if (!this.T.IXON_P) {
      this.activateFlow();
      this.flushToLower();
    }
  }
  clearToLower() {
    this.toLowerBuf.length = 0;
  }
  flushToLower() {
    if (this.flowActivated == false) return;
    this._onWriteToLower.fire(this.toLowerBuf);
    this.clearToLower();
  }
  outputToLower(buf) {
    this.toLowerBuf.push(...buf);
  }
  updateBaseColumn() {
    if (this.toUpperBuf.length == 0) {
      this.baseColumn = this.column;
    }
  }
  clearToUpper() {
    this.toUpperBuf.length = 0;
    this.updateBaseColumn();
  }
  flushToUpper() {
    this._onWriteToUpper.fire(this.toUpperBuf);
    this.clearToUpper();
  }
  outputToUpper(c) {
    this.toUpperBuf.push(c);
  }
  outputToLowerWithPostprocess(c) {
    if (this.T.OPOST_P) {
      switch (c) {
        case BS:
          if (this.column > 0) this.column--;
          this.outputToLower([BS]);
          break;
        case TAB: {
          const spaces = 8 - this.column % 8;
          this.column += spaces;
          this.outputToLower(
            this.T.TABDLY_XTABS_P ? new Array(spaces).fill(SP) : [TAB]
          );
          break;
        }
        case NL:
          if (this.T.ONLCR_P) {
            this.baseColumn = this.column = 0;
            this.outputToLower([CR, NL]);
          } else if (this.T.ONLRET_P) {
            this.column = 0;
            this.outputToLower([NL]);
          } else {
            this.baseColumn = this.column;
            this.outputToLower([NL]);
          }
          break;
        case CR:
          if (this.T.ONOCR_P && this.column == 0) {
          } else if (this.T.OCRNL_P) {
            if (this.T.ONLRET_P) this.baseColumn = this.column = 0;
            this.outputToLower([NL]);
          } else {
            this.baseColumn = this.column = 0;
            this.outputToLower([CR]);
          }
          break;
        default:
          if (!(this.T.IUTF8_P && isUtf8ContinuationByte(c))) this.column++;
          this.outputToLower(this.T.OLCUC_P ? [toupper(c)] : [c]);
          break;
      }
    } else {
      this.outputToLower([c]);
    }
  }
  echoToLower(chars, raw) {
    if (typeof chars == "number") chars = [chars];
    for (const c of chars) {
      if (this.T.ECHOCTL_P && iscntrl(c) && c != TAB && !raw) {
        this.outputToLower([94, c ^ 64]);
        this.column += 2;
      } else {
        this.outputToLowerWithPostprocess(c);
      }
    }
  }
  inputFromLowerWithPreprocess(c) {
    if (c == CR) {
      if (this.T.IGNCR_P) return;
      if (this.T.ICRNL_P) c = NL;
    } else if (c == NL && this.T.INLCR_P) {
      c = CR;
    }
    if (this.T.ICANON_P && c == NL) {
      if (this.T.ECHO_P || this.T.ECHONL_P) {
        this.echoToLower(NL, true);
        this.flushToLower();
      }
      this.outputToUpper(NL);
      this.flushToUpper();
    } else if (this.T.ECHO_P) {
      this.finishECHOPRT();
      this.updateBaseColumn();
      if (c == NL) {
        this.echoToLower(NL, true);
      } else {
        this.echoToLower(c);
      }
      this.flushToLower();
      this.outputToUpper(c);
    } else {
      this.outputToUpper(c);
    }
  }
  erase(type) {
    if (this.toUpperBuf.length == 0) return;
    if (type == "VKILL") {
      if (!this.T.ECHO_P) {
        this.clearToUpper();
        return;
      }
      if (!this.T.ECHOK_P || !this.T.ECHOKE_P || !this.T.ECHOE_P) {
        this.clearToUpper();
        this.finishECHOPRT();
        this.echoToLower(this.T.KILL_V);
        if (this.T.ECHOK_P) this.echoToLower(NL, true);
        return;
      }
    }
    let alnumsFound = false;
    for (let idx = this.toUpperBuf.length - 1; idx >= 0; idx--) {
      const c = this.toUpperBuf[idx];
      if (this.T.IUTF8_P && isUtf8ContinuationByte(c)) continue;
      if (type == "VWERASE") {
        if (isalnum(c) || c == 95) {
          alnumsFound = true;
        } else if (alnumsFound) break;
      }
      const removedChar = this.toUpperBuf.splice(idx);
      if (this.T.ECHO_P) {
        if (this.T.ECHOPRT_P) {
          this.startECHOPRT();
          this.echoToLower(removedChar);
        } else if (type == "VERASE" && !this.T.ECHOE_P) {
          this.echoToLower(this.T.ERASE_V);
        } else if (c == TAB) {
          let count = 0;
          let tabFound = false;
          for (let idx2 = this.toUpperBuf.length - 1; idx2 >= 0; idx2--) {
            const c2 = this.toUpperBuf[idx2];
            if (c2 == TAB) {
              tabFound = true;
              break;
            } else if (iscntrl(c2)) {
              if (this.T.ECHOCTL_P) count += 2;
            } else if (this.T.IUTF8_P && isUtf8ContinuationByte(c2)) {
            } else {
              count++;
            }
          }
          if (!tabFound) count += this.baseColumn;
          count = 8 - count % 8;
          this.outputToLower(new Array(count).fill(BS));
          this.column = Math.max(0, this.column - count);
        } else {
          if (iscntrl(c) && this.T.ECHOCTL_P) {
            this.echoToLower([BS, SP, BS], true);
          }
          if (!iscntrl(c) || this.T.ECHOCTL_P) {
            this.echoToLower([BS, SP, BS], true);
          }
        }
      }
      if (type == "VERASE") break;
    }
    if (this.toUpperBuf.length == 0) {
      this.clearToUpper();
      if (this.T.ECHO_P) this.finishECHOPRT();
    }
  }
  startECHOPRT() {
    if (!this.echoprt) {
      this.echoToLower(92, true);
      this.echoprt = true;
    }
  }
  finishECHOPRT() {
    if (this.echoprt) {
      this.echoToLower(47, true);
      this.echoprt = false;
    }
  }
  signal(sig, c) {
    this._onSignalToUpper.fire(sig);
    if (!this.T.NOFLSH_P) {
      this.clearToLower();
      this.clearToUpper();
    }
    if (this.T.IXON_P) this.activateFlow();
    if (this.T.ECHO_P) this.echoToLower(c);
    this.flushToLower();
  }
  checkStartFlow() {
    if (this.flowActivated == false && this.T.IXON_P && this.T.IXANY_P) {
      this.activateFlow();
      this.flushToLower();
    }
  }
  nextLiteral() {
    this.vlnext = true;
    if (this.T.ECHO_P) {
      this.finishECHOPRT();
      if (this.T.ECHOCTL_P) {
        this.echoToLower([94, BS], true);
        this.flushToLower();
      }
    }
  }
  reprint() {
    this.finishECHOPRT();
    this.echoToLower(this.T.REPRINT_V);
    this.echoToLower(NL, true);
    this.echoToLower(this.toUpperBuf);
  }
  writeFromLower(arg) {
    const buf = typeof arg == "string" ? stringToUtf8Bytes(arg) : arg;
    for (let c of buf) {
      if (this.T.ISTRIP_P) c &= 127;
      if (this.T.IUCLC_P && this.T.IEXTEN_P) c = tolower(c);
      const keyAction = this.vlnext ? "normal" : this.keyActions[c];
      this.vlnext = false;
      switch (keyAction) {
        case "normal":
          this.checkStartFlow();
          this.inputFromLowerWithPreprocess(c);
          break;
        case "VERASE":
        case "VWERASE":
        case "VKILL":
          this.checkStartFlow();
          this.erase(keyAction);
          this.flushToLower();
          break;
        case "VEOF":
          this.checkStartFlow();
          this.flushToUpper();
          break;
        case "VEOL":
          this.checkStartFlow();
          if (this.T.ECHO_P) {
            this.echoToLower(c);
            this.flushToLower();
          }
          this.outputToUpper(c);
          this.flushToUpper();
          break;
        case "VLNEXT":
          this.checkStartFlow();
          this.nextLiteral();
          break;
        case "VREPRINT":
          this.checkStartFlow();
          this.reprint();
          this.flushToLower();
          break;
        case "VSTART":
          this.activateFlow();
          this.flushToLower();
          break;
        case "VSTOP":
          this.deactivateFlow();
          break;
        case "VINTR":
          this.signal("SIGINT", c);
          break;
        case "VQUIT":
          this.signal("SIGQUIT", c);
          break;
        case "VSUSP":
          this.signal("SIGTSTP", c);
          break;
      }
    }
    if (!this.T.ICANON_P) {
      this.flushToUpper();
    }
  }
  writeFromUpper(arg) {
    if (this.flowActivated == false) {
      throw "Do not write anything during flowStatus is stopped";
    }
    const buf = typeof arg == "string" ? stringToUtf8Bytes(arg) : arg;
    for (const c of buf) this.outputToLowerWithPostprocess(c);
    this.flushToLower();
  }
};

// src/pty.ts
var bufferLimit = 4096;
var Master = class {
  constructor(ldisc, slave) {
    this.ldisc = ldisc;
    this.slave = slave;
    this.disposables = [];
    this._onWrite = new EventEmitter();
    this.onWrite = this._onWrite.register;
    this.fromLdiscToLowerBuffer = [];
    this.waitingForLower = false;
    const flushToLower = () => {
      if (this.fromLdiscToLowerBuffer.length >= 1) {
        this.waitingForLower = true;
        const buf = new Uint8Array(this.fromLdiscToLowerBuffer.splice(0, 4096));
        if (this.fromLdiscToLowerBuffer.length <= bufferLimit)
          this.notifyWritable();
        this._onWrite.fire([buf, flushToLower]);
      } else {
        this.waitingForLower = false;
      }
    };
    this.ldisc.onWriteToLower((buf) => {
      this.fromLdiscToLowerBuffer.push(...buf);
      if (!this.waitingForLower) flushToLower();
    });
    const { notifyWritable, notifyResize } = slave.initFromMaster();
    this.notifyWritable = notifyWritable;
    this.notifyResize = notifyResize;
  }
  activate(xterm) {
    this.onWrite(([buf, callback]) => xterm.write(buf, callback));
    const onData = (str) => this.ldisc.writeFromLower(str);
    this.disposables.push(
      xterm.onData(onData),
      xterm.onBinary(onData),
      xterm.onResize(({ cols, rows }) => this.notifyResize(rows, cols))
    );
  }
  dispose() {
    this.disposables.forEach((d) => d.dispose());
    this.disposables.length = 0;
  }
};
var Slave = class {
  constructor(ldisc) {
    this.ldisc = ldisc;
    this._onReadable = new EventEmitter();
    this.onReadable = this._onReadable.register;
    this._onWritable = new EventEmitter();
    this.onWritable = this._onWritable.register;
    this._onSignal = new EventEmitter();
    this.onSignal = this._onSignal.register;
    this.fromLdiscToUpperBuffer = [];
    this.fromUpperToLdiscBuffer = [];
    this.winsize = [80, 24];
    this.ldisc.onWriteToUpper((buf) => {
      this.fromLdiscToUpperBuffer.push(...buf);
      this._onReadable.fire();
    });
    this.ldisc.onFlowActivated(() => {
      if (this.fromUpperToLdiscBuffer.length >= 1) {
        this.ldisc.writeFromUpper(this.fromUpperToLdiscBuffer);
        this.fromUpperToLdiscBuffer.length = 0;
      }
    });
    this.ldisc.onSignalToUpper((sig) => {
      this._onSignal.fire(sig);
    });
  }
  initFromMaster() {
    return {
      notifyWritable: () => this._onWritable.fire(),
      notifyResize: (rows, cols) => {
        this.winsize = [cols, rows];
        this._onSignal.fire("SIGWINCH");
      }
    };
  }
  get readable() {
    return this.fromLdiscToUpperBuffer.length >= 1;
  }
  read(length) {
    const len = typeof length !== "undefined" ? Math.min(this.fromLdiscToUpperBuffer.length, length) : this.fromLdiscToUpperBuffer.length;
    return this.fromLdiscToUpperBuffer.splice(0, len);
  }
  get writable() {
    return this.fromUpperToLdiscBuffer.length <= bufferLimit;
  }
  write(arg) {
    const buf = typeof arg == "string" ? stringToUtf8Bytes(arg) : arg;
    this.fromUpperToLdiscBuffer = this.fromUpperToLdiscBuffer.concat(buf);
    if (this.ldisc.flow) {
      this.ldisc.writeFromUpper(this.fromUpperToLdiscBuffer);
      this.fromUpperToLdiscBuffer.length = 0;
    }
  }
  ioctl(req, arg) {
    switch (req) {
      case "TCGETS":
        return this.ldisc.termios.clone();
      case "TCSETS":
        this.ldisc.termios = Termios.fromConfig(arg);
        return;
      case "TIOCGWINSZ":
        return this.winsize.slice();
    }
  }
};
var openpty = () => {
  const ldisc = new LineDiscipline();
  const slave = new Slave(ldisc);
  const master = new Master(ldisc, slave);
  return { master, slave };
};

// src/client-server/termiosData.ts
var termiosToData = (termios) => {
  const data = [termios.iflag, termios.oflag, termios.cflag, termios.lflag];
  let word = 0;
  let offset = 8;
  for (let i = 0; i < termios.cc.length; i++) {
    word |= termios.cc[i] << offset;
    offset += 8;
    if (offset == 32) {
      data.push(word);
      word = 0;
      offset = 0;
    }
  }
  data.push(word);
  return data;
};
var dataToTermios = (data) => {
  const cc = [];
  let ptr = 4;
  let word = data[ptr++];
  let offset = 8;
  for (let i = 0; i < 32; i++) {
    cc.push(word >> offset & 255);
    offset += 8;
    if (offset >= 32) {
      word = data[ptr++];
      offset = 0;
    }
  }
  return new Termios(data[0], data[1], data[2], data[3], cc);
};

// src/client-server/ttyClient.ts
var TtyClient = class {
  constructor(shared) {
    this.streamCtrl = new Int32Array(shared, 0, 1);
    this.streamData = new Int32Array(shared, 4);
  }
  req(r) {
    this.streamCtrl[0] = 0;
    self.postMessage(r);
    Atomics.wait(this.streamCtrl, 0, 0);
  }
  onRead(length) {
    if (!length) length = this.streamData.length - 1;
    this.req({ ttyRequestType: "read", length });
    const len = this.streamData[0];
    return Array.from(this.streamData.slice(1, len + 1));
  }
  onWrite(buf) {
    this.req({ ttyRequestType: "write", buf });
  }
  onWaitForReadable(timeout) {
    this.req({ ttyRequestType: "poll", timeout });
    return this.streamData[0] == 1;
  }
  onIoctlTcgets() {
    this.req({ ttyRequestType: "tcgets" });
    return dataToTermios(Array.from(this.streamData.slice(0, 13)));
  }
  onIoctlTcsets(termios) {
    const data = termiosToData(termios);
    this.req({ ttyRequestType: "tcsets", data });
  }
  onIoctlTiocgwinsz() {
    this.req({ ttyRequestType: "tiocgwinsz" });
    return [this.streamData[0], this.streamData[1]];
  }
};

// src/client-server/ttyServer.ts
var TtyServer = class {
  constructor(slave) {
    this.slave = slave;
    this.shared = new SharedArrayBuffer(4 + 256);
    this.streamCtrl = new Int32Array(this.shared, 0, 1);
    this.streamData = new Int32Array(this.shared, 4);
    this.state = "idle";
    this.timeoutHandler = null;
    this.fromWorkerBuf = [];
    this.toWorkerBuf = [];
    this.stop_ = null;
    slave.onWritable(() => {
      if (this.fromWorkerBuf.length >= 1) this.feedFromWorker();
    });
    slave.onReadable(() => {
      this.toWorkerBuf.push(...slave.read());
      switch (this.state) {
        case "poll":
          this.waitForReadable(0);
          break;
        case "input":
          this.feedToWorker(this.toWorkerBuf.length);
          break;
      }
    });
    slave.onSignal((sig) => {
      console.info(`A signal ${sig} is currently ignored`);
    });
  }
  ack() {
    Atomics.store(this.streamCtrl, 0, 1);
    Atomics.notify(this.streamCtrl, 0);
    this.state = "idle";
  }
  feedToWorker(length) {
    if (this.state != "input") throw "worker does not wait for input";
    if (length > this.streamData.length - 1)
      length = this.streamData.length - 1;
    const buf = this.toWorkerBuf.splice(0, length);
    this.streamData[0] = buf.length;
    this.streamData.set(buf, 1);
    this.ack();
  }
  feedFromWorker() {
    if (this.fromWorkerBuf.length == 0) throw "worker does not wait for output";
    if (this.slave.writable) {
      this.ack();
      this.slave.write(this.fromWorkerBuf.splice(0));
    }
  }
  waitForReadable(timeout) {
    if (this.state != "poll") throw "worker does not wait for poll";
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
    if (this.toWorkerBuf.length > 0) {
      this.streamData[0] = 1;
      this.ack();
    } else {
      if (timeout < 0) {
      } else if (timeout > 0) {
        this.timeoutHandler = setTimeout(
          () => this.waitForReadable(0),
          timeout * 1e3
        );
      } else {
        this.streamData[0] = 2;
        this.ack();
      }
    }
  }
  start(worker, callback) {
    this.stop();
    let stop = false;
    this.stop_ = () => stop = true;
    worker.onmessage = (ev) => {
      const req_ = ev.data;
      if (typeof req_ == "object" && req_.ttyRequestType) {
        if (stop) return;
        const req = req_;
        switch (req.ttyRequestType) {
          case "read":
            this.state = "input";
            if (this.toWorkerBuf.length >= 1) this.feedToWorker(req.length);
            break;
          case "write":
            this.fromWorkerBuf.push(...req.buf);
            this.feedFromWorker();
            break;
          case "poll":
            this.state = "poll";
            this.waitForReadable(req.timeout);
            break;
          case "tcgets":
            this.streamData.set(termiosToData(this.slave.ioctl("TCGETS")));
            this.ack();
            break;
          case "tcsets":
            this.slave.ioctl("TCSETS", dataToTermios(req.data));
            this.ack();
            break;
          case "tiocgwinsz": {
            const [rows, cols] = this.slave.ioctl("TIOCGWINSZ");
            this.streamData[0] = rows;
            this.streamData[1] = cols;
            this.ack();
            break;
          }
        }
      } else if (callback) {
        callback(ev);
      }
    };
    worker.postMessage(this.shared);
  }
  stop() {
    if (this.stop_) this.stop_();
  }
};
export {
  Flags,
  Termios,
  TtyClient,
  TtyServer,
  openpty
};
//# sourceMappingURL=index.mjs.map