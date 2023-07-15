### Code Features:

- Made reusable and configurable ContactInput component that is used both in adding and editing contacts.
- In depth warnings using toast notification.
- Code makes fake API request on crud operation.

### Libraries used:

- react-toastify for toast notification.
- react-spinners for loading spinners.
- axios for making API requests.

### Components

- ContactsList- It initially fetches the contacts and lets you add contacts using ContactInput component, it sends fake API request on adding new contact, it displays Contact component.
- Contact- It displays the contact and Does edit(using ContactInput) and delete options on the contact. It handles loading and editing state.
- ContactInput -It is reusable component that inputs number and name of a contact to be edited/created.
- Navbar- The header that appears on top.

### Test Cases

- edit the created contact[PASSED]
- edit an edited contact[PASSED]
- delete a newly created contact[PASSED]
- deleted an edited contact[PASSED]
