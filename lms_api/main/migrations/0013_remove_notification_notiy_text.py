# Generated by Django 5.0.6 on 2024-05-15 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_notification'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='notiy_text',
        ),
    ]
