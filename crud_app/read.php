<?php
include 'db.php';

$sql = "SELECT id, name, email, created_at FROM users"; // exclude password
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row['id']."</td>
                <td>".$row['name']."</td>
                <td>".$row['email']."</td>
                <td>".$row['created_at']."</td>
                <td>
                    <a href='update.php?id=".$row['id']."'>Edit</a> | 
                    <a href='delete.php?id=".$row['id']."'>Delete</a>
                </td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}
?>