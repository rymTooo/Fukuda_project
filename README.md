# Fukuda_project
CSS326 Database Lab project.
## project introduction
Our project is a clicker game inspired by coockie clicker with getsu fuuma den theme. The expected user are people with busy schedule, but want to enjoy playing game. Idle game like our project is perfect, since it allow user to progress without having to actively play the game. It also suit a person who enjoy to see number go up or see the character progress, which surprsingly a lot of people actually fit the category.
## Game Design

- Tap to increase money
![image](https://github.com/rymTooo/Fukuda_project/assets/125113738/27d25070-7ae2-424f-89fd-435dbfa70229)

- Buy skill to increase passive income and increase money per click
![image](https://github.com/rymTooo/Fukuda_project/assets/125113738/ff0a5fc2-ff59-4377-9d41-e8696d5d27df)

- Buy powerup from store to increase skills power (twice..)
![image](https://github.com/rymTooo/Fukuda_project/assets/125113738/033219bf-ab90-4805-acec-3c9a1883e88a)


- Click to a threshold cps for some second to get powered (autoclick 2x) on random cooldown (Events)

- Use money to buy Fukuda customization

## Tables 
- User (username, password)
- Skill( skill upgrade list)
- Store (power up list)
- Stats
- Fukuda Customization
- Setting
- Events

EERD(link : https://drive.google.com/file/d/1qOWuVpo94jOJCajYtX2wI9oSJOAr3NXi/view?usp=sharing )

## Rules:
- Each user can buy many skills. Each skill can be bought by many users
- Each user can buy many powerups. Each powerups can be bought by many users.
- Each user can customize a Fukuda Customisation. Each Fukuda Customisation can be customized by only one user.
- Each user has a stat. Each stat is owned by a user.
- Each power up affected a skill. A skill may be affected by powerups.
- Each User has a setting. Each setting belongs to a user.
- Each user can encounter many events. Each events can happen to many users.



## User Journey (Patt)
- User เจอ Login Page
- User register
- User enter login page
- User enter game page
- User click fukuda to increase money
- User buy skill to increase passive income and increase money per click
- User buy powerup from store to increase skills power 
- User encounter an event
- User click on customisation button
- User change Fukuda appearance by click arrow button
- User close customisation page
- User click on setting
- User change setting
- User close setting
- User click on stats
- User read stats
- User close stats
## Entity list
- User
- Skills
- Powerup
- Stats
- Events
- Fukuda Customization
## Relations list
- Set(user-setting)
- buy skill
- buy powerup
- has(user - stat)
- customize
- encounter(event-user)
- affect(skill-powerup)
## User Interface(Pon)

## Database Design (Gus, Patt)
![alt text](img/ERD.png)
![FukudaERD](https://github.com/rymTooo/Fukuda_project/assets/125113738/bbeaf759-df18-4587-a442-e288d7655c9f)
^this is ERD for project database
## Slide()
