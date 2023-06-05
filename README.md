# Message templater

Chrome extension for formatting templates using data from a web page, and then sending them.

## Supported sites:

Now supports only LinkedIn.

## Supported variables:

* firstName - first name of user.
* lastName - last name of user.
* fullName - Shortcut of {firstName} {lastName}.

## Usage:

1. Create template in such format: 

> Hello, {firstName}!
> How are you?

2. Go to the site and navigate to the user page you want to send this message.

3. Click send (or connect, if you want to add this user) and formatter will receive the user's info, insert it into the template and insert into the send input. All you have to do after that is submit sending.
