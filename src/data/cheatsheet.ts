export type CheatSection =
  | "Core / 核心"
  | "Window / 窗口"
  | "Pane / 面板"
  | "Session"
  | "Copy mode / 复制"
  | "Misc / 杂项"
  | "Command mode / 命令模式"
  | "Resurrect / 持久化"
  | "Files / 文件位置";

export type CheatEntry = {
  id: string;
  section: CheatSection;
  title: string;
  /** Key sequence, e.g. "prefix d" — shown in subtitle, copyable */
  shortcut?: string;
  /** Tmux command (after `prefix :`), e.g. "kill-session -a" — shown in subtitle, copyable */
  command?: string;
  /** Shell command, e.g. "tmux attach -t name" — copyable */
  shell?: string;
  /** Short one-line description (shown as accessory + in detail). Optional: self-explanatory entries can omit. */
  description?: string;
  /** Optional longer markdown for the detail view */
  details?: string;
  /** Keywords for search (added to Raycast keywords) */
  keywords?: string[];
};

const E = (entry: CheatEntry): CheatEntry => entry;

// Note: "prefix" refers to whatever prefix key is configured in tmux.conf
// (default `Ctrl+b`; common remap `Ctrl+a`). Shortcuts below use stock tmux defaults.

export const CHEAT_ENTRIES: CheatEntry[] = [
  // ── Core ─────────────────────────────────────────────────────────────────
  E({
    id: "core-detach",
    section: "Core / 核心",
    title: "Detach 临时退出",
    shortcut: "prefix d",
    description: "脱离当前 client，session 在后台继续跑。",
    keywords: ["detach", "退出", "后台", "background"],
  }),
  E({
    id: "core-attach",
    section: "Core / 核心",
    title: "Attach to a session",
    shell: "tmux attach -t <name>",
    description: "接回指定 session（最近一个用 `tmux a`）。",
    keywords: ["attach", "接回"],
  }),
  E({
    id: "core-list-sessions",
    section: "Core / 核心",
    title: "List sessions",
    shell: "tmux ls",
    description: "列出所有 tmux session。等价 `tmux list-sessions`。",
    keywords: ["list", "ls"],
  }),
  E({
    id: "core-new-session",
    section: "Core / 核心",
    title: "New named session",
    shell: "tmux new -s <name>",
    description: "新建并 attach 到一个具名 session。加 `-d` 创建但不 attach。",
    keywords: ["new", "create"],
  }),
  E({
    id: "core-kill-session",
    section: "Core / 核心",
    title: "Kill session by name",
    shell: "tmux kill-session -t <name>",
    description: "杀掉指定 session。",
    keywords: ["kill"],
  }),
  E({
    id: "core-kill-server",
    section: "Core / 核心",
    title: "Kill tmux server",
    shell: "tmux kill-server",
    description: "杀掉 tmux server 本身（所有 session 一并退出）。",
    keywords: ["kill", "server", "exit"],
  }),

  // ── Window ───────────────────────────────────────────────────────────────
  E({
    id: "win-new",
    section: "Window / 窗口",
    title: "New window",
    shortcut: "prefix c",
    description: "新建 tmux window（tab），继承当前 pane 的 cwd。",
    keywords: ["new", "tab"],
  }),
  E({
    id: "win-next",
    section: "Window / 窗口",
    title: "Next window",
    shortcut: "prefix n",
    description: "切到下一个 window。",
  }),
  E({
    id: "win-prev",
    section: "Window / 窗口",
    title: "Previous window",
    shortcut: "prefix p",
    description: "切到上一个 window。",
  }),
  E({
    id: "win-last",
    section: "Window / 窗口",
    title: "Last window",
    shortcut: "prefix l",
    description: "切到上一次访问的 window（toggle）。",
    keywords: ["last", "toggle"],
  }),
  E({
    id: "win-jump",
    section: "Window / 窗口",
    title: "Jump to window N",
    shortcut: "prefix 0..9",
    description: "直接跳到编号 N 的 window。",
    keywords: ["jump", "goto"],
  }),
  E({
    id: "win-picker",
    section: "Window / 窗口",
    title: "Window picker (tree)",
    shortcut: "prefix w",
    description: "交互式 window/session 选择器。",
    keywords: ["choose", "tree"],
  }),
  E({
    id: "win-rename",
    section: "Window / 窗口",
    title: "Rename window",
    shortcut: "prefix ,",
    description: "重命名当前 window。",
  }),
  E({
    id: "win-kill",
    section: "Window / 窗口",
    title: "Kill window",
    shortcut: "prefix &",
    description: "杀掉当前 window（会问确认）。",
    keywords: ["kill", "close"],
  }),
  E({
    id: "win-move",
    section: "Window / 窗口",
    title: "Move window to index N",
    command: "move-window -t N",
    description: "把当前 window 挪到 N 号位。",
  }),

  // ── Pane ─────────────────────────────────────────────────────────────────
  E({
    id: "pane-split-h",
    section: "Pane / 面板",
    title: "Split horizontally",
    shortcut: 'prefix "',
    description: "上下切分当前 pane。",
    keywords: ["split", "horizontal"],
  }),
  E({
    id: "pane-split-v",
    section: "Pane / 面板",
    title: "Split vertically",
    shortcut: "prefix %",
    description: "左右切分当前 pane。",
    keywords: ["split", "vertical"],
  }),
  E({
    id: "pane-cycle",
    section: "Pane / 面板",
    title: "Next pane",
    shortcut: "prefix o",
    description: "切到下一个 pane（顺时针）。",
  }),
  E({
    id: "pane-move",
    section: "Pane / 面板",
    title: "Move between panes",
    shortcut: "prefix ↑/↓/←/→",
    description: "按方向选 pane。",
    keywords: ["arrow", "navigate"],
  }),
  E({
    id: "pane-zoom",
    section: "Pane / 面板",
    title: "Toggle pane zoom",
    shortcut: "prefix z",
    description: "把当前 pane 临时全屏（再按一次复原）。",
    keywords: ["zoom", "fullscreen", "maximize"],
  }),
  E({
    id: "pane-numbers",
    section: "Pane / 面板",
    title: "Show pane numbers",
    shortcut: "prefix q",
    description: "屏幕闪现 pane 编号，再按数字跳过去。",
  }),
  E({
    id: "pane-kill",
    section: "Pane / 面板",
    title: "Kill pane",
    shortcut: "prefix x",
    description: "杀掉当前 pane（会问确认）。",
    keywords: ["kill", "close"],
  }),
  E({
    id: "pane-swap",
    section: "Pane / 面板",
    title: "Swap pane with next / previous",
    shortcut: "prefix { / }",
    description: "把当前 pane 和前/后一个对调。",
    keywords: ["swap"],
  }),
  E({
    id: "pane-resize",
    section: "Pane / 面板",
    title: "Resize pane",
    shortcut: "prefix Ctrl+↑/↓/←/→",
    description: "按住 prefix 后用 Ctrl+方向键调整 pane 大小。",
    keywords: ["resize"],
  }),
  E({
    id: "pane-break",
    section: "Pane / 面板",
    title: "Break pane to new window",
    shortcut: "prefix !",
    description: "把当前 pane 提升为独立 window。",
    keywords: ["break", "promote"],
  }),
  E({
    id: "pane-layout",
    section: "Pane / 面板",
    title: "Cycle layouts",
    shortcut: "prefix Space",
    description:
      "在预设布局间循环（even-h / even-v / main-h / main-v / tiled）。",
    keywords: ["layout"],
  }),

  // ── Session ──────────────────────────────────────────────────────────────
  E({
    id: "sess-picker",
    section: "Session",
    title: "Session picker",
    shortcut: "prefix s",
    description: "交互式 session 选择器。",
  }),
  E({
    id: "sess-prev",
    section: "Session",
    title: "Previous session",
    shortcut: "prefix (",
  }),
  E({
    id: "sess-next",
    section: "Session",
    title: "Next session",
    shortcut: "prefix )",
  }),
  E({
    id: "sess-rename",
    section: "Session",
    title: "Rename current session",
    shortcut: "prefix $",
  }),

  // ── Copy mode ────────────────────────────────────────────────────────────
  E({
    id: "copy-enter",
    section: "Copy mode / 复制",
    title: "Enter copy mode",
    shortcut: "prefix [",
    description: "进入复制/滚屏模式。",
    keywords: ["scroll", "copy", "滚屏"],
  }),
  E({
    id: "copy-begin-vi",
    section: "Copy mode / 复制",
    title: "Begin selection (vi mode)",
    shortcut: "v",
    description: "vi 模式下按 v 开始视觉选择。emacs 模式用 Space。",
  }),
  E({
    id: "copy-yank-vi",
    section: "Copy mode / 复制",
    title: "Yank selection (vi mode)",
    shortcut: "y",
    description:
      "vi 模式下按 y 复制。配合 `set -s copy-command 'pbcopy'` 同步到系统剪贴板。",
    keywords: ["yank", "pbcopy", "clipboard"],
  }),
  E({
    id: "copy-exit",
    section: "Copy mode / 复制",
    title: "Exit copy mode",
    shortcut: "q / Esc",
  }),
  E({
    id: "copy-search-fwd",
    section: "Copy mode / 复制",
    title: "Search forward",
    shortcut: "/",
  }),
  E({
    id: "copy-search-back",
    section: "Copy mode / 复制",
    title: "Search backward",
    shortcut: "?",
  }),

  // ── Misc ─────────────────────────────────────────────────────────────────
  E({
    id: "misc-help",
    section: "Misc / 杂项",
    title: "Show all key bindings",
    shortcut: "prefix ?",
    description: "弹出当前所有绑定。等价命令 `list-keys`。",
  }),
  E({
    id: "misc-cmd",
    section: "Misc / 杂项",
    title: "Enter command mode",
    shortcut: "prefix :",
    description: "进入 tmux 命令行。支持 Tab 补全、↑↓ 翻历史、`;` 链式。",
  }),
  E({
    id: "misc-reload",
    section: "Misc / 杂项",
    title: "Reload config",
    shortcut: "prefix : source ~/.tmux.conf",
    description: "改完 tmux.conf 不重启重载。",
    keywords: ["source", "reload"],
  }),
  E({
    id: "misc-clock",
    section: "Misc / 杂项",
    title: "Show clock",
    shortcut: "prefix t",
  }),

  // ── Command mode ─────────────────────────────────────────────────────────
  E({
    id: "cmd-clear-history",
    section: "Command mode / 命令模式",
    title: "Clear scrollback",
    command: "clear-history",
    description: "清当前 pane 的 scrollback。",
    keywords: ["clear", "scrollback", "清"],
  }),
  E({
    id: "cmd-kill-target",
    section: "Command mode / 命令模式",
    title: "Kill session by name",
    command: "kill-session -t <name>",
    description: "杀掉指定 session。",
  }),
  E({
    id: "cmd-kill-others",
    section: "Command mode / 命令模式",
    title: "Kill all other sessions",
    command: "kill-session -a",
    description: "杀除当前 session 之外所有 session。",
    keywords: ["clean", "扫除"],
  }),
  E({
    id: "cmd-rename-session",
    section: "Command mode / 命令模式",
    title: "Rename session",
    command: "rename-session <new>",
  }),
  E({
    id: "cmd-rename-window",
    section: "Command mode / 命令模式",
    title: "Rename window",
    command: "rename-window <new>",
  }),
  E({
    id: "cmd-move-window",
    section: "Command mode / 命令模式",
    title: "Move window to position",
    command: "move-window -t N",
    description: "把当前 window 挪到 N 号位。",
  }),
  E({
    id: "cmd-swap-window",
    section: "Command mode / 命令模式",
    title: "Swap windows",
    command: "swap-window -s X -t Y",
    description: "把 window X 和 Y 对调。",
  }),
  E({
    id: "cmd-toggle-mouse",
    section: "Command mode / 命令模式",
    title: "Toggle mouse mode",
    command: "set -g mouse on",
    description: "打开鼠标支持（滚轮、点击聚焦、拖拽 resize）；off 关闭。",
  }),
  E({
    id: "cmd-toggle-status",
    section: "Command mode / 命令模式",
    title: "Toggle status bar",
    command: "set -g status off",
    description: "临时藏 status bar（截图 / 录屏）；on 打开。",
  }),
  E({
    id: "cmd-find-window",
    section: "Command mode / 命令模式",
    title: "Find window by text",
    command: "find-window <text>",
    description: "跨 window 搜文本，秒跳过去。",
  }),
  E({
    id: "cmd-respawn-pane",
    section: "Command mode / 命令模式",
    title: "Respawn pane",
    command: "respawn-pane -k",
    description: "pane 里命令死了，原地重启 shell（不开新 pane）。",
  }),
  E({
    id: "cmd-display-panes",
    section: "Command mode / 命令模式",
    title: "Display pane numbers",
    command: "display-panes",
    description: "屏幕闪现 pane 编号，按数字直接跳。",
  }),
  E({
    id: "cmd-list-keys",
    section: "Command mode / 命令模式",
    title: "List key bindings",
    command: "list-keys",
    description: "查所有绑定（等价 prefix ?）。",
  }),
  E({
    id: "cmd-move-window-cross",
    section: "Command mode / 命令模式",
    title: "Move window across sessions",
    command: "move-window -s src:N -t dst:",
    description: "把 src session 的 N 号 window 搬到 dst session。",
  }),

  // ── Resurrect ────────────────────────────────────────────────────────────
  E({
    id: "resurrect-about",
    section: "Resurrect / 持久化",
    title: "About tmux-resurrect",
    shell: "https://github.com/tmux-plugins/tmux-resurrect",
    description:
      "tmux-resurrect 插件：把 session/window/pane 布局存到磁盘，重启 tmux 后恢复。本扩展自带保存/恢复命令。",
    keywords: ["plugin"],
  }),
  E({
    id: "resurrect-save-key",
    section: "Resurrect / 持久化",
    title: "Save layout (plugin default)",
    shortcut: "prefix Ctrl+s",
    description: "插件默认绑定的保存键。",
    keywords: ["save", "backup"],
  }),
  E({
    id: "resurrect-restore-key",
    section: "Resurrect / 持久化",
    title: "Restore layout (plugin default)",
    shortcut: "prefix Ctrl+r",
    description: "插件默认绑定的恢复键。",
    keywords: ["restore"],
  }),
  E({
    id: "resurrect-save-cmd",
    section: "Resurrect / 持久化",
    title: "Save via command",
    command: "run-shell ~/.tmux/plugins/tmux-resurrect/scripts/save.sh",
    description: "命令方式立刻保存。",
  }),
  E({
    id: "resurrect-restore-cmd",
    section: "Resurrect / 持久化",
    title: "Restore via command",
    command: "run-shell ~/.tmux/plugins/tmux-resurrect/scripts/restore.sh",
    description: "命令方式恢复上次保存。",
  }),

  // ── Files ────────────────────────────────────────────────────────────────
  E({
    id: "file-tmux-conf",
    section: "Files / 文件位置",
    title: "~/.tmux.conf",
    description: "tmux 主配置：prefix、键位、视觉、插件加载。",
    keywords: ["config"],
  }),
  E({
    id: "file-tmux-plugins",
    section: "Files / 文件位置",
    title: "~/.tmux/plugins/",
    description: "TPM (Tmux Plugin Manager) 默认的插件安装目录。",
    keywords: ["plugin", "tpm"],
  }),
];

export const SECTIONS_IN_ORDER: CheatSection[] = [
  "Core / 核心",
  "Window / 窗口",
  "Pane / 面板",
  "Session",
  "Copy mode / 复制",
  "Misc / 杂项",
  "Command mode / 命令模式",
  "Resurrect / 持久化",
  "Files / 文件位置",
];
