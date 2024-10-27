# Changelog

## [1.3.0](https://github.com/IdentalerMaxima/perszePlus/compare/v1.2.1...v1.3.0) (2024-10-27)


### Features

* create protected route component ([7e922ef](https://github.com/IdentalerMaxima/perszePlus/commit/7e922ef50edff8663534a54df5718c0153365e95))


### Bug Fixes

* add create default reg status if none is set ([e1e9edd](https://github.com/IdentalerMaxima/perszePlus/commit/e1e9edda2f59b16e34425e263b53c89923cf596d))
* add create default user settings if none are found ([27656f2](https://github.com/IdentalerMaxima/perszePlus/commit/27656f2a7c2638363adf44b00e365da48d69a4a8))
* add loading funcitonality to settings so it waits for fetch ([46e1de5](https://github.com/IdentalerMaxima/perszePlus/commit/46e1de538a47c59be6d740faf0173fbc48261cff))
* add loading state to context provider ([ca62253](https://github.com/IdentalerMaxima/perszePlus/commit/ca62253ea7dc64cc0ae64f13545e911a334325f0))
* add loading state to login page so it has time to ask for reg status ([86bb2de](https://github.com/IdentalerMaxima/perszePlus/commit/86bb2deda78d08db806b9323567141f5d898f40d))
* add protected route to router ([876ae08](https://github.com/IdentalerMaxima/perszePlus/commit/876ae088f1b305f16379f14a4ccf8e8d1e76b882))
* correct field name ([3491879](https://github.com/IdentalerMaxima/perszePlus/commit/3491879e068b509359921537da691eef2bb34def))
* event view for non admins faulty ([a03e3b8](https://github.com/IdentalerMaxima/perszePlus/commit/a03e3b8cdbb23a720783460ddfb6b484f5021ffe))
* fix admin dashboard option not showing in mobile view ([189a4c6](https://github.com/IdentalerMaxima/perszePlus/commit/189a4c6a6e70beca2fb5c6b61a7d121b78a51f58))
* fix spa reload problem in production ([1a28b8d](https://github.com/IdentalerMaxima/perszePlus/commit/1a28b8df7b516b9cd71edb64ea03d77775081a95))
* Update event URL in EventCreated notification ([944ff2f](https://github.com/IdentalerMaxima/perszePlus/commit/944ff2f51ffcf7f4cc0f9c13265410b7ee7e50e3))
* Update event URL in NewCourseNotification ([7543dbd](https://github.com/IdentalerMaxima/perszePlus/commit/7543dbd97f5b0b7ab75e60521525277a03c44ac7))

## [1.2.1](https://github.com/IdentalerMaxima/perszePlus/compare/v1.2.0...v1.2.1) (2024-10-09)


### Bug Fixes

* correct images requested from docker hub ([705ffc4](https://github.com/IdentalerMaxima/perszePlus/commit/705ffc4d0bb7f8536658b984c6b9a9b7652a6904))

## [1.2.0](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.8...v1.2.0) (2024-10-09)


### Features

* add docker file for backend ([30c0cfe](https://github.com/IdentalerMaxima/perszePlus/commit/30c0cfec506051114852e7ce8582be8cffcae829))

## [1.1.8](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.7...v1.1.8) (2024-10-02)


### Bug Fixes

* merge migration files, update the seeder so it creates a specific admin and 20 random users ([2677e1c](https://github.com/IdentalerMaxima/perszePlus/commit/2677e1c8cdbaa327ca4d1fe656d089e405da32a8))
* remove max avatar size constraint ([ad00646](https://github.com/IdentalerMaxima/perszePlus/commit/ad006466e16bd7f2393a2b0881976da53324dd9d))

## [1.1.7](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.6...v1.1.7) (2024-09-02)


### Bug Fixes

* Fix mobile view for news ([1882595](https://github.com/IdentalerMaxima/perszePlus/commit/1882595e1c15c2001143520d28ab88d42739253b))

## [1.1.6](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.5...v1.1.6) (2024-08-31)


### Bug Fixes

* do mafic update ([11d76d9](https://github.com/IdentalerMaxima/perszePlus/commit/11d76d936aa7ed81a5984dd8680bbb3dfa63f523))

## [1.1.5](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.4...v1.1.5) (2024-08-31)


### Bug Fixes

* Correct mobile styling in news ([e663def](https://github.com/IdentalerMaxima/perszePlus/commit/e663deff37c258ddfa78015dc12951ca5b37c907))

## [1.1.4](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.3...v1.1.4) (2024-08-30)


### Bug Fixes

* Fix Invitation based registration turn off error ([f7013c5](https://github.com/IdentalerMaxima/perszePlus/commit/f7013c55979d0f36341eb877d9c8bfad740846ca))

## [1.1.3](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.2...v1.1.3) (2024-08-29)


### Bug Fixes

* Add icon next to user attendance in events if missed or went ([e9a0ba6](https://github.com/IdentalerMaxima/perszePlus/commit/e9a0ba69519e6145326c8026cb6d0f8b3a681362))
* Fix if user did not check in event then sent to missed ([a1604d9](https://github.com/IdentalerMaxima/perszePlus/commit/a1604d94122b641f976fd9ec2a1ea8efb45b3ffa))
* When user loads events show past events too by default ([70f1dfb](https://github.com/IdentalerMaxima/perszePlus/commit/70f1dfb925fb422aa5e71c5831d94d0fbe200181))

## [1.1.2](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.1...v1.1.2) (2024-08-28)


### Bug Fixes

* Add extension to file object to display, this will solve "Cant view files in Member Profile" error ([0c3ce4f](https://github.com/IdentalerMaxima/perszePlus/commit/0c3ce4fb3164bfac667e86cf1d327d66f4836e3a))

## [1.1.1](https://github.com/IdentalerMaxima/perszePlus/compare/v1.1.0...v1.1.1) (2024-08-28)


### Bug Fixes

* Fix isAdmin not always setting after new session ([56b78f8](https://github.com/IdentalerMaxima/perszePlus/commit/56b78f8e6e616a18d2e497933bbb617ba3597ce7))
* Fix pagination so it sticks to the bottom of the page ([fc16414](https://github.com/IdentalerMaxima/perszePlus/commit/fc164144a4d8a4eca42aa65038b6931b9f5ea7dd))

## [1.1.0](https://github.com/IdentalerMaxima/perszePlus/compare/v1.0.1...v1.1.0) (2024-08-27)


### Features

* Add event name to success message ([b9ba406](https://github.com/IdentalerMaxima/perszePlus/commit/b9ba406ecf064556dcc70c66adc9a352ba470e6c))


### Bug Fixes

* Add event name to success message after check in ([a406e3e](https://github.com/IdentalerMaxima/perszePlus/commit/a406e3e09603d3495d7ae7803cb864295f5ce94f))
* Make no users registered text prettier ([5c9a77d](https://github.com/IdentalerMaxima/perszePlus/commit/5c9a77d413246ddecb0afbb9cabeed6170a0b8df))

## [1.0.1](https://github.com/IdentalerMaxima/perszePlus/compare/v1.0.0...v1.0.1) (2024-08-26)


### Bug Fixes

* Add fix to course image upload ([c8c0685](https://github.com/IdentalerMaxima/perszePlus/commit/c8c0685ae7f2526d9cf836f298cffe9def5e7ad6))

## 1.0.0 (2024-08-26)


### Features

* Add Admin Dboard to menu def lout ([9c2369a](https://github.com/IdentalerMaxima/perszePlus/commit/9c2369a5ef54a78d9ee7e35f692931f16c523a84))
* Add Admin page to routes ([0c81836](https://github.com/IdentalerMaxima/perszePlus/commit/0c81836e29597a1d73391cfbb7bb3021b67b7d40))
* Add Admin page with profile layout and content switching ([bf0bdf5](https://github.com/IdentalerMaxima/perszePlus/commit/bf0bdf5000d6c56ea1e70bf4c70fc219b95e5126))
* Add admin settings registration page save settings functionality ([04e4564](https://github.com/IdentalerMaxima/perszePlus/commit/04e4564faa00f295c1dcf7387d6d892ccb7f45db))
* Add AdminSettings model ([e571d8e](https://github.com/IdentalerMaxima/perszePlus/commit/e571d8ed2026ccb9771d06ff0580ffa01b3cc811))
* Add AdminSettingsSeeder to seed admin settings in the database ([9f7206a](https://github.com/IdentalerMaxima/perszePlus/commit/9f7206a0f48656de775ed8aa3a61f077d6cdf778))
* add api endpoint to fetch a course by id ([2bdc051](https://github.com/IdentalerMaxima/perszePlus/commit/2bdc05122c983e175dd531b600b2747a42232a2e))
* Add api endpoints for inviting users and managing settings ([af4a2dd](https://github.com/IdentalerMaxima/perszePlus/commit/af4a2dd60bf5100a4f82e142f06e46f9716338df))
* Add closed column to Event model ([9b364db](https://github.com/IdentalerMaxima/perszePlus/commit/9b364dbc88c584cb6f2a1cf3d27a533cdf7fdcd5))
* Add closed column to events table ([316cec5](https://github.com/IdentalerMaxima/perszePlus/commit/316cec57ac4fefc413c3d91f371182d8b4303639))
* Add closed column to events table ([fd49e08](https://github.com/IdentalerMaxima/perszePlus/commit/fd49e08f78969325df546da69bfebbee2a93b226))
* Add course notification for new courses ([f800d56](https://github.com/IdentalerMaxima/perszePlus/commit/f800d56c46b997d5dfc28a9069da576e2a55ea0f))
* Add CourseAttendeesDialog to CourseDetails ([3c3f2a8](https://github.com/IdentalerMaxima/perszePlus/commit/3c3f2a8d1a5659310ada95fab75aa7680c9f0892))
* Add email notification settings for messages ([3aca6ba](https://github.com/IdentalerMaxima/perszePlus/commit/3aca6bab6c14999c7df4417a4af9ab40ff982939))
* Add email notifications for new events ([7529065](https://github.com/IdentalerMaxima/perszePlus/commit/752906525ef9b93d32792e54a2dbd35eb566ceb4))
* Add email notifications for new posts ([7f83330](https://github.com/IdentalerMaxima/perszePlus/commit/7f83330d4b972d7f1191504d0e0cd945d9bec7c1))
* Add email notifications for new posts and courses ([d169c4a](https://github.com/IdentalerMaxima/perszePlus/commit/d169c4a1e1ff9ee08baecb99c636f800aee94d8e))
* Add EventCreated notification for sending email notifications ([d24b6a5](https://github.com/IdentalerMaxima/perszePlus/commit/d24b6a5ae3178c2a90ebf40162183f80f8b63640))
* add fetch course by id functionality to controller ([453a7f7](https://github.com/IdentalerMaxima/perszePlus/commit/453a7f7d0f89792c54ff85572d0fe30dffe0ad59))
* Add getUserById route to api ([bee9675](https://github.com/IdentalerMaxima/perszePlus/commit/bee967549bd2ca7c8c844d6c3238ee603974aafe))
* Add i18next dependency for internationalization support ([acdb24e](https://github.com/IdentalerMaxima/perszePlus/commit/acdb24e9ff456abb3edbd6b8ad388d20ec300736))
* Add if invalid token redirect user, also add success snackbar when signup ([363c1b0](https://github.com/IdentalerMaxima/perszePlus/commit/363c1b084d6a009e61628e86a2914e507b655c0a))
* Add invite functionality ([de1e37d](https://github.com/IdentalerMaxima/perszePlus/commit/de1e37de153b3cecc9e15ba64bef30da37c2f9c1))
* Add invite functionality to AdminController ([cf2d7be](https://github.com/IdentalerMaxima/perszePlus/commit/cf2d7be376cceb96e1ea05e3c30e0db1e2c2701e))
* Add Invite model for managing invitation data ([58527ec](https://github.com/IdentalerMaxima/perszePlus/commit/58527ece9c6930c696a7edf0bbe8e957718e9dd6))
* Add invite route to api ([1b3776d](https://github.com/IdentalerMaxima/perszePlus/commit/1b3776d392d2488fd0df915d046c323a63d99561))
* Add Invite validation endpoint logic ([c33b4b8](https://github.com/IdentalerMaxima/perszePlus/commit/c33b4b8460127e4f0ad5407418043178b4b8072e))
* Add InviteNotification class for sending invitation emails ([d052724](https://github.com/IdentalerMaxima/perszePlus/commit/d052724b258ce18b76d1fec3a7e4eca3b5ef103f))
* Add loading state and spinner to Settings component ([09a1474](https://github.com/IdentalerMaxima/perszePlus/commit/09a1474c5c11a48a4f920e9d1a10ee3305b1faad))
* Add MessageReceived notification for sending email notifications ([36c93c3](https://github.com/IdentalerMaxima/perszePlus/commit/36c93c353978cfa7f6210df7bfb31cf4bcc2cda3))
* add no users registered yet to course text ([6b1d386](https://github.com/IdentalerMaxima/perszePlus/commit/6b1d3861f338a84354819feacfa44f47ec046dcb))
* Add RegistrationRestricted component for handling restricted registration ([8e4ef02](https://github.com/IdentalerMaxima/perszePlus/commit/8e4ef028ff927c6e9821aa3e1453bfef2dd40899))
* Add RegistrationRestricted route to router ([a745def](https://github.com/IdentalerMaxima/perszePlus/commit/a745def856ed1fce84c28a9e5b4b711c313a1fc3))
* Add reopen Event logic front and back ([9c2cefe](https://github.com/IdentalerMaxima/perszePlus/commit/9c2cefe555be498f639bb207f7b61046c988541f))
* Add selectedMessageId and messages state to ContextProvider ([f126236](https://github.com/IdentalerMaxima/perszePlus/commit/f126236fafffd76f40898ef9c0354d388f3d7466))
* Add sendemail job for courses ([9f86232](https://github.com/IdentalerMaxima/perszePlus/commit/9f862323eb4a4f0dd600dae2d165ba37489103b2))
* Add SendEmailJob for sending email notifications ([b69d417](https://github.com/IdentalerMaxima/perszePlus/commit/b69d4171eccb95c8b252d0bb1b2d413983039c73))
* Add SendPostNotificationJob for sending post notifications ([21cca99](https://github.com/IdentalerMaxima/perszePlus/commit/21cca992cc05cd7b650089822931da33f6090ef7))
* Add settings endpoints ([5d2a8da](https://github.com/IdentalerMaxima/perszePlus/commit/5d2a8daac089060a028d58ed333f94c73899415d))
* Add settings form for notifications ([e9e994e](https://github.com/IdentalerMaxima/perszePlus/commit/e9e994e67dd16664c1ac6e8643867d117e3780bc))
* Add Settings model for user settings management ([5a5d0d2](https://github.com/IdentalerMaxima/perszePlus/commit/5a5d0d213cd89048b95f6734adf8bc0818056de8))
* Add settings registration front ([e3aa3e6](https://github.com/IdentalerMaxima/perszePlus/commit/e3aa3e6a7423001d42a65bc3c16bc11643f09826))
* Add signup invalid token logic and redirect ([9ead57a](https://github.com/IdentalerMaxima/perszePlus/commit/9ead57ae0df85879f3ab1f26121073879ec306bd))
* Add SuccessSnackbar component for displaying success messages ([5b5354a](https://github.com/IdentalerMaxima/perszePlus/commit/5b5354a252112572eb54be2c44ac8dbbd02de067))
* Add support for sending email notifications for new courses, posts, and events ([70e70ec](https://github.com/IdentalerMaxima/perszePlus/commit/70e70ec5a945c3991ff2e793b2886df2e187d3fa))
* Add user invite admin logic ([7f633a5](https://github.com/IdentalerMaxima/perszePlus/commit/7f633a51e74b191c4cba47ca2a2cdcaa0ec36cc1))
* Add user settings endpoints and functionality ([1dc127e](https://github.com/IdentalerMaxima/perszePlus/commit/1dc127e9fb6cc20cb1a4ba2a7b45ac2840dc02bd))
* Add user settings relationship ([f62271c](https://github.com/IdentalerMaxima/perszePlus/commit/f62271c229962614d361a6d903d83c6ccbfa3f73))
* Create CourseAttendeesDialog component ([b509445](https://github.com/IdentalerMaxima/perszePlus/commit/b509445bd854918bcb680f5837ce6f87344f0898))
* Create migration for admin_settings table ([47f1275](https://github.com/IdentalerMaxima/perszePlus/commit/47f1275df6e7c259cbcadfac129a8df4ad0f14d9))
* Create migration for invites table ([102e807](https://github.com/IdentalerMaxima/perszePlus/commit/102e8072b379b5f32b60ec3cbe1f68d23f4d2587))
* Create migration for jobs table ([ccc83a1](https://github.com/IdentalerMaxima/perszePlus/commit/ccc83a1316ac3179067f2045095a7935904d36f1))
* Create migration for settings table ([beaf68e](https://github.com/IdentalerMaxima/perszePlus/commit/beaf68e0bd21f9cee8dbe10c6954e2b2967185c4))
* Create release.yml ([a70a99b](https://github.com/IdentalerMaxima/perszePlus/commit/a70a99b14939a12ac377e9fa2a64902d1de6d882))
* Display users and details in CourseAttendeesDialog ([dbd014e](https://github.com/IdentalerMaxima/perszePlus/commit/dbd014e3808fbe383f56a753bfe985a3ab5cc042))
* make courses useState and add fetch course call after clicking enrollment ([faf0573](https://github.com/IdentalerMaxima/perszePlus/commit/faf05731f6e7b7ffa86f38b3e1dce1d7037ba6cd))
* Pass selected course to dialog ([488710a](https://github.com/IdentalerMaxima/perszePlus/commit/488710afbabd1b4425927a071967955fab648be4))
* Refactor EventController to use SendEmailJob for sending email notifications ([f7b25cd](https://github.com/IdentalerMaxima/perszePlus/commit/f7b25cd45a4df3bdf0f669f75ae2108588f0aee1))
* remove view from docx in member profile and add download functionality ([862accb](https://github.com/IdentalerMaxima/perszePlus/commit/862accb64d3f20780b7196fc6a248cb1e9b04ad7))
* Return users related to course in controller ([1b497a6](https://github.com/IdentalerMaxima/perszePlus/commit/1b497a61b841e85bceb5744fa0303274faaaa73d))
* Seed admin settings in DatabaseSeeder ([1255229](https://github.com/IdentalerMaxima/perszePlus/commit/1255229ae4921c1f8bc53f359e36a10bd52792cd))
* Send email notification when a message is sent ([9f983a0](https://github.com/IdentalerMaxima/perszePlus/commit/9f983a02ffd2118516aaadee88bfd9d3fe237ec3))
* Update API endpoint for inviting users in AdminController ([e074a0b](https://github.com/IdentalerMaxima/perszePlus/commit/e074a0bae25c2f90cbcba7f4c4f10556efa69262))
* Update Settings model to include user_id as primary key ([caff216](https://github.com/IdentalerMaxima/perszePlus/commit/caff21699b800790399cbeca04550a4220a4a506))
* Update UserSeeder to create user settings during seeding ([8013b64](https://github.com/IdentalerMaxima/perszePlus/commit/8013b64d1e2eeebecd939d7e6ef9ddf9fdc1598a))


### Bug Fixes

* add redirect root to news in router ([0526562](https://github.com/IdentalerMaxima/perszePlus/commit/05265626b82a39c806175dd26a32c11d28ee57be))
* Correct news route ([71a4c64](https://github.com/IdentalerMaxima/perszePlus/commit/71a4c64d3f6df0f9cf6ef89bc2a92fae4652c676))
* Fix bug where cancel button didnt reset temp addr checkbox ([def9cb5](https://github.com/IdentalerMaxima/perszePlus/commit/def9cb5fbf62fbbe425bd41597168cf9af3c9860))
* Fix closed event logic ([473b122](https://github.com/IdentalerMaxima/perszePlus/commit/473b1226311d68de72caba43a95a2637316865d7))
* Fix invite email URL to use localhost for testing ([aef653e](https://github.com/IdentalerMaxima/perszePlus/commit/aef653e8a5626c1caa15cf55414c0e560707f089))
* Fix message fetching before user token is set in and refactor some lines ([3c72590](https://github.com/IdentalerMaxima/perszePlus/commit/3c72590f4c67703eb2a034ff09c0c2ca8adafa07))
* word files now dont have view button, fix padding ([1098787](https://github.com/IdentalerMaxima/perszePlus/commit/109878761e60f19c374714d7e919d8698d4d1d7a))
