# 从零部署到 Railway，拿到新地址

按下面步骤做完后，你会得到一个类似 `https://jude-store-xxx.up.railway.app` 的网址，这就是你的新网站地址。之后可以在 Manus 的「管理域名」里把 `jude.homes` 指到这个地址。

---

## 第一步：注册 GitHub 并上传代码

### 1.1 注册 GitHub

1. 打开浏览器，访问：**https://github.com**
2. 点击右上角 **Sign up**（注册）。
3. 按页面提示用邮箱注册一个账号（记住账号和密码）。

### 1.2 在电脑上安装 Git（如果还没装）

1. 打开：**https://git-scm.com/download/win**
2. 下载 **Windows 版**，双击安装，一路点「下一步」即可。

### 1.3 在 GitHub 上创建一个「空仓库」

1. 登录 GitHub 后，点击右上角 **+** → **New repository**。
2. **Repository name** 填：`jude-store`（或任意英文名）。
3. 选择 **Private** 或 **Public** 都可以。
4. **不要**勾选 "Add a README file"。
5. 点击 **Create repository**。
6. 创建完成后，页面上会有一个地址，类似：  
   `https://github.com/你的用户名/jude-store.git`  
   **先复制保存这个地址**，后面要用。

### 1.4 把项目文件夹上传到这个仓库

先注意一件事：

- **不要输入** ```` ```cmd ```` 和 ```` ``` ```` 这两个符号。
- 它们只是文档里的“代码框”，**不是命令本身**。
- 你在命令提示符里，**只需要输入框里面那一行真正的命令**。

如果你输入 `git init` 后提示：

`'git' 不是内部或外部命令`

说明你的电脑**还没有安装 Git**。请先完成下面这个小步骤：

1. 打开：**https://git-scm.com/download/win**
2. 下载 Windows 版 Git。
3. 双击安装，安装时一路点「下一步」就可以。
4. 安装完成后，**把命令提示符窗口关掉，重新打开一个新的命令提示符窗口**。
5. 重新输入下面这句检查：

   ```cmd
   git --version
   ```

6. 如果能看到类似 `git version 2.xx.x`，说明 Git 已经安装成功，可以继续下面步骤。

1. 按 **Win + R**，输入 **cmd**，回车，打开「命令提示符」。
2. 输入下面这一行（把路径改成你电脑上 jude-store 项目所在文件夹），回车：

   ```cmd
   cd C:\Users\Administrator\Desktop\jude-store-deployment-package\jude-store-source
   ```

3. 依次输入下面每一行，每输入一行就按一次回车：

   ```cmd
   git init
   ```

   ```cmd
   git add .
   ```

   ```cmd
   git commit -m "first commit"
   ```

   ```cmd
   git branch -M main
   ```

   ```cmd
   git remote add origin https://github.com/你的用户名/jude-store.git
   ```

   **注意**：把 `你的用户名/jude-store` 换成你在 1.3 里创建的那个仓库地址中间那一段（例如 `zhangsan/jude-store`）。

4. 最后一行（会要你输入 GitHub 用户名和密码或令牌）：

   ```cmd
   git push -u origin main
   ```

   - 如果提示要登录，用你的 GitHub 账号登录。
   - 如果 GitHub 要求用 **Personal Access Token** 代替密码，请到 GitHub 网站：**Settings → Developer settings → Personal access tokens** 里生成一个 token，用这个 token 当密码粘贴进去。

5. 上传成功后，在浏览器里打开 `https://github.com/你的用户名/jude-store`，应该能看到你的项目文件。

---

## 第二步：注册 Railway 并部署网站

### 2.1 注册 Railway

1. 打开：**https://railway.app**
2. 点击 **Login** 或 **Start a New Project**。
3. 选择 **Login with GitHub**，用你的 GitHub 账号授权登录。

### 2.2 新建项目并添加 MySQL 数据库

1. 登录后点击 **New Project**。
2. 选择 **Deploy from GitHub repo**（从 GitHub 仓库部署）。
3. 若提示连接 GitHub，点 **Configure GitHub App**，勾选你的账号或仓库权限，然后回到 Railway。
4. 在仓库列表里找到 **jude-store**，点击选中。
5. Railway 会创建一个「服务」。先不要管它，我们先把数据库加上：
   - 在项目页面里，点击 **+ New**（或 **Add Service**）。
   - 选择 **Database** → **MySQL**（或 **Add MySQL**）。
6. 等 MySQL 创建好（几十秒）。创建好后，点进这个 **MySQL** 服务，在 **Variables** 或 **Connect** 里找到 **MYSQL_URL** 或 **DATABASE_URL**（或 **MySQL Connection URL**），**复制**这个地址（格式类似 `mysql://root:xxx@xxx.railway.internal:3306/railway`）。  
   **如果只有 MYSQL_URL**：可以把它当作 `DATABASE_URL` 使用，复制保存。

### 2.3 配置「网站服务」并填数据库地址

1. 回到项目首页，点击你之前从 GitHub 部署出来的那个服务（名字可能是 **jude-store** 或仓库名）。
2. 点 **Variables**（变量）：
   - 点击 **+ New Variable** 或 **Add Variable**。
   - 名称填：**DATABASE_URL**
   - 值填：刚才复制的 MySQL 连接地址（整段粘贴）。
   - 保存。
3. 点 **Settings**（设置）：
   - **Build Command**（构建命令）填：  
     `pnpm install && pnpm run build`
   - **Start Command**（启动命令）填：  
     `pnpm start`
   - **Root Directory** 留空。
   - 若有 **Release Command**（发布时执行的命令），填：  
     `pnpm db:push`  
     （没有这一项可先跳过，见下方说明。）
   - 保存。

### 2.4 首次发布（Deploy）

1. 在服务页面点 **Deploy** 或 **Redeploy**（若没有按钮，保存设置后 Railway 通常会自动重新部署）。
2. 等待几分钟，看 **Deployments** 里是否出现 **Success** 或绿色勾。
3. 若失败，点进这次部署，看 **Logs** 里红色报错，把报错内容复制下来，发给帮你的人。

### 2.5 拿到新地址

1. 部署成功后，在服务页面找 **Settings** → **Networking** 或 **Domains**。
2. 点击 **Generate Domain** 或 **Add Domain**，Railway 会分配一个地址，例如：  
   `https://jude-store-production-xxxx.up.railway.app`
3. **复制这个完整网址**，这就是你的「新地址」。

---

## 第三步：把 jude.homes 指到新地址（在 Manus 改 DNS）

1. 打开 Manus，进入 **域名** → **jude.homes** → **管理** → **DNS 记录**。
2. 若新地址是「网址」（如 `xxx.up.railway.app`）：
   - 点 **+ 添加记录**，类型选 **CNAME**（若有），名称填 **@**，值填 `xxx.up.railway.app`，确认。
   - 再添加一条，名称填 **www**，值同样填 `xxx.up.railway.app`，确认。
   - 若原来已有 **@** 和 **www** 的 A 记录（104.18.26.246），可先编辑或删除，再按上面添加两条 CNAME。
3. 若新地址是「IP」：
   - 添加（或编辑）两条 **A** 记录，名称分别为 **@** 和 **www**，值都填这个 IP。
4. 保存后等 5～30 分钟，再在浏览器打开 **https://jude.homes**，应会打开你在 Railway 上的网站。

---

## 常见问题

**Q：Release Command 没有或填了报错？**  
A：可以暂时不填。部署成功后，若网站打开报错或无法下单，多半是数据库表还没建。那时需要「本地跑一次建表」：在你这台电脑的命令提示符里，先 `cd` 到项目目录，设置 `DATABASE_URL` 为 Railway 里 MySQL 的地址（同上），然后执行一次 `pnpm db:push`。不会操作可以把报错截图发给帮你的人。

**Q：git push 时提示 403 或 Permission denied？**  
A：一般是 GitHub 登录问题。用浏览器登录 GitHub，在 **Settings → Developer settings → Personal access tokens** 里新建一个 token，在命令行里用这个 token 当密码再试一次 `git push`。

**Q：Railway 部署一直失败？**  
A：在 Railway 该服务的 **Deployments** 里点进失败的那次，看 **Logs**，把最后几行红色错误复制下来，发给帮你的人，才能对症排查。

---

## 小结

| 步骤 | 你要做的事 |
|------|------------|
| 1 | GitHub 注册 → 建空仓库 jude-store → 用 cmd 在本机项目目录执行 git init / add / commit / remote / push |
| 2 | Railway 用 GitHub 登录 → New Project → 从 GitHub 选 jude-store → 加 MySQL → 在网站服务里填 DATABASE_URL、Build/Start 命令 → Deploy → 生成域名，复制新地址 |
| 3 | Manus 管理域名 jude.homes → DNS 里把 @ 和 www 指到新地址（CNAME 或 A）→ 等生效后访问 jude.homes |

做完这些，你就完成了「从零部署到 Railway、拿到新地址」，并可以把 jude.homes 沿用下去。
