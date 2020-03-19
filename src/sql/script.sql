CREATE TABLE estudiante (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  direccion varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  fecha_nacimiento varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  saldo decimal(12,2) NOT NULL,
  PRIMARY KEY (id)
)