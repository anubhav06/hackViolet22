# Generated by Django 3.2.6 on 2022-02-05 18:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('bio', models.CharField(max_length=500)),
                ('image', models.ImageField(upload_to='')),
                ('startTime', models.TimeField(default=None, null=True)),
                ('endTime', models.TimeField(default=None, null=True)),
                ('timeZone', models.CharField(default=None, max_length=5, null=True)),
                ('mentor', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userInfo', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]