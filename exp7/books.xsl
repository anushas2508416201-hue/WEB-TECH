<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/bookstore">

<html>
<head>
<title>Book Store Details</title>

<style>
body{
font-family: Arial, sans-serif;
background-color:#f4f4f4;
margin:40px;
}

h2{
text-align:center;
color:#333;
}

table{
margin:auto;
border-collapse:collapse;
width:65%;
background:white;
}

th{
background-color:#444;
color:white;
padding:10px;
border:1px solid #333;
}

td{
padding:8px;
border:1px solid #555;
text-align:center;
}

tr:nth-child(even){
background-color:#f2f2f2;
}

caption{
font-weight:bold;
margin-bottom:10px;
}
</style>

</head>

<body>

<h2>Book Store Details</h2>

<table>

<tr>
<th>Title</th>
<th>Author</th>
<th>Price</th>
</tr>

<xsl:for-each select="book">
<tr>
<td><xsl:value-of select="title"/></td>
<td><xsl:value-of select="author"/></td>
<td><xsl:value-of select="price"/></td>
</tr>
</xsl:for-each>

</table>

</body>
</html>

</xsl:template>

</xsl:stylesheet>