document.addEventListener('DOMContentLoaded', () => {
    const loadUsersButton = document.getElementById('loadUsers');
    const userTable = document.getElementById('userTable');
    const editUserForm = document.getElementById('editUserForm');
    let users = [];

    loadUsersButton.addEventListener('click', async () => {
        const response = await fetch('http://localhost/test/back');
        users = await response.json();
        renderUsers(users);
    });

    editUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = editUserForm.closest('.modal').dataset.index;
        const user = users[index];
        user.name = document.getElementById('name').value;
        user.lastName = document.getElementById('lastName').value;
        user.age = document.getElementById('age').value;
        renderUsers(users);
        $('#editUserModal').modal('hide');
    });

    function renderUsers(users) {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = `
                <tr data-index="${index}">
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit" data-toggle="modal" data-target="#editUserModal">Editar</button>
                        <button class="btn btn-danger btn-sm delete">Eliminar</button>
                    </td>
                </tr>`;
            userTable.innerHTML += row;
        });

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('tr').dataset.index;
                const user = users[index];
                document.getElementById('name').value = user.name;
                document.getElementById('lastName').value = user.lastName;
                document.getElementById('age').value = user.age;
                editUserForm.closest('.modal').dataset.index = index;
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('tr').dataset.index;
                users.splice(index, 1);
                renderUsers(users);
            });
        });
    }
});
