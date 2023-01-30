from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField(max_length=64, blank=False)
    last_name = models.CharField(max_length=64, blank=False)

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def str(self):
        return self.get_full_name()


class Request(models.Model):
    keyword = models.CharField(max_length=64, blank=False)
    location = models.CharField(max_length=64, blank=False)
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    def str(self):
        return f'{self.keyword} {self.location}'


class Company(models.Model):
    name = models.CharField(max_length=64, blank=False)
    address = models.CharField(max_length=256)
    phone = models.CharField(max_length=32)
    website = models.CharField(max_length=64)
    request = models.ForeignKey(
        Request,
        on_delete=models.PROTECT
    )

    def str(self):
        return self.name
