# Generated by Django 5.0.6 on 2024-05-16 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_notification_notify_subject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notify_for',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
