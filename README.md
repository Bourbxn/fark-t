<h1 align="center">FARK-T</h1>
<div align="center">
	<a href="#showcase">Showcase</a>
  <span> • </span>
    	<a href="#tech-stack">Tech Stack</a>
  <span> • </span>
    	<a href="#requirement">Requirement</a>
   <span> • </span>
	<a href="#setup-project">Setup Project</a>
   <span> • </span>
	<a href="#start-project">Start Project</a>
    <span> • </span>
	<a href="#contributor">Contributor</a>
  <p></p>
</div> 


**DESCRIPTION** : This is a project in my Web Application Development Project (01076120), Computer Engineering at KMITL Class. This project about food delivery 
web application that user can order food that call fark and user can buy food for other user. At the first login user will get 3 coins, Your coin will decrease 
when you order food depend on your order and your coin will increase when you buy the food for other user depend on order amount. The other features is
edit profile and coin history.

## Showcase
![image](https://user-images.githubusercontent.com/86193685/235547686-f4b05921-91e2-4d67-8a56-648993e8164c.png)
![image](https://user-images.githubusercontent.com/86193685/235547714-0a3e54bb-0542-4488-80b3-c3c5f106c661.png)
![image](https://user-images.githubusercontent.com/86193685/235547834-9178130f-85bd-4140-8443-bf8d029f3e70.png)

<br>

## Tech Stack
- <b>Frontend</b> [React Typescript (Created by Vite)](https://vitejs.dev/) with [Tailwindcss](https://tailwindcss.com/)
- <b>Backend</b>  [ASP.NET Core 6.0](https://dotnet.microsoft.com/en-us/apps/aspnet)
- <b>Database</b> [MySQL](https://www.mysql.com/)
<br>

## Requirement
1. [Yarn (1.22.xx)](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
```bash
npm install --global yarn
```
2. [.NET CLI (6.0.xx)](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
3. [MySQL Tools](https://www.mysql.com/products/workbench/)
<br>

## Setup Project
#### 1. Clone project
```bash
git clone https://github.com/Bourbxn/fark-t.git
```

#### 2. Setup Database
1. Login to MySQL tools
2. Create schema in MySQL tools name ```farkt```

#### 3. Setup Backend
1. Open and edit file ```ApplicationDbContext.cs``` in ```fark-t/server/ApplicationDbContext.cs```
```cs
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server;

public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("Host=localhost;Port=<MySQL-Port>;Database=farkt;User ID=<MySQL-Username>;Password=<MySQL-Password>");
    }
    public DbSet<Users> Users { get; set; }
    public DbSet<Orders> Orders { get; set; }
    public DbSet<Farks> Farks { get; set; }
    public DbSet<Histories> Histories { get; set; }
}
```
2. Migrate Database
```bash
cd server
dotnet ef migrations add <migration-comment>
dotnet ef database update
```
#### 4. Setup Frontend
1. Install package
```bash
cd client
yarn
```
2. Open and edit file ```.env``` in ```fark-t/client/.env ```
```env
VITE_APP_API=<backend-url>/api
```
<br>

## Start Project
#### 1. Backend
```bash
cd server
dotnet run
```
#### 2. Frontend
```bash
cd client
yarn dev
```
#### 3. Start project at ```http://localhost:5173/```
<br>

## Contributor

<div>
<span>
<a href="https://github.com/Bourbxn">
 <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/86193685?v=4&h=80&w=80&fit=cover&mask=circle&maxage=7d"/>
</a>
</span>







