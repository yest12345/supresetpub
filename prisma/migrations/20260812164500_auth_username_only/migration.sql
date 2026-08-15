-- AlterTable: make email optional, change must_change_password default
ALTER TABLE `users` MODIFY `email` VARCHAR(255) NULL;
ALTER TABLE `users` MODIFY `must_change_password` BOOLEAN NOT NULL DEFAULT false;
