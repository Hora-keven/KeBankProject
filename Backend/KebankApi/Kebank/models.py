from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self,first_name, surname, cpf_cnpj, email, password=None):
        if not email:
            raise ValueError("Put an email address")
        if not cpf_cnpj:
            raise ValueError("Put an username")
        
        user = self.model(
            email = email,
            cpf_cnpj = cpf_cnpj,
            first_name = first_name,
            surname = surname,
        )
       
        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def create_superuser(self,first_name, surname,cpf_cnpj, email, password=None):
        if not email:
            raise ValueError("Put an email address")
        if not cpf_cnpj:
            raise ValueError("Put an username")
        
        user = self.create_user(
            email = self.normalize_email(email=email),
            cpf_cnpj = cpf_cnpj,
            password=password,
            first_name = first_name,
            surname = surname,
            
        )
    
        user.is_admin = True
        user.is_active = True
        user.is_staff= True
        user.is_superadmin = True
        user.save(using=self.db)
        
        return user
    

class User(AbstractBaseUser):
    
    first_name = models.CharField(max_length=100, blank=False)
    surname = models.CharField(max_length=100,  blank=True, null=True)
    cpf_cnpj = models.CharField(max_length=30, unique=True,  blank=False)
    email = models.EmailField(max_length=100, unique=True, blank=False)
    phone_number = models.CharField(max_length=11, blank=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_admin =  models.BooleanField(default=False)
    is_active =  models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
  
    objects = UserManager()
    
    USERNAME_FIELD = "cpf_cnpj"
    REQUIRED_FIELDS = ["first_name", "surname", "email"]
   
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
 
class PhysicalPerson(models.Model):
    fk_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="legal_person_User")
    born_date = models.DateField(null=False, blank=False)
    cpf = models.CharField(max_length=11, blank=False, primary_key=True, unique=True)
    rg = models.CharField(max_length=9, blank=False, unique=True)
    
    def save(self, *args, **kwargs):
        super(PhysicalPerson, self).save(*args, **kwargs)
    
    def __str__(self) -> str:
        return f"{self.cpf}"
    
    
    
class JuridicPerson(models.Model):
    fk_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="juridic_person_User")
    state_registration = models.CharField(max_length=11)
    open_date = models.DateField(null=False, blank=False)
    cnpj = models.CharField(max_length=14, primary_key=True, unique=True)
    
    def save(self, *args, **kwargs):
        super(JuridicPerson, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.cnpj}"
        
        
class Account(models.Model):
    agency = models.IntegerField(blank=True)
    number = models.IntegerField(blank=True)
    number_verificate = models.IntegerField(blank=True)
    type_account = models.CharField(max_length=20)
    limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True )
    active = models.BooleanField(default=True)
    physical_person = models.OneToOneField(PhysicalPerson, on_delete=models.CASCADE,  null=True, related_name="legal_person_LegalPerson", unique=True)
    juridic_person = models.OneToOneField(JuridicPerson, on_delete=models.CASCADE, null=True, related_name="juridic_person_JuridicPerson", unique=True)
    
    def save(self, *args, **kwargs):
        super(Account, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{ self.id} {self.type_account}'
    
    
class Address(models.Model):
    city = models.CharField(max_length=100, blank=False)
    neighborhood = models.CharField(max_length=100, blank=False)
    federative_unit = models.CharField(max_length=2, blank=False)
    pac = models.CharField(max_length=10, blank=False)
    public_place = models.CharField(max_length=100, blank=False)
    street =  models.CharField(max_length=100, blank=False)
    physical_person = models.ForeignKey(PhysicalPerson, on_delete=models.CASCADE,  null=True, related_name="physical_person_address_LegalPerson")
    juridic_person = models.ForeignKey(JuridicPerson, on_delete=models.CASCADE, null=True, related_name="juridic_person_address_JuridicPerson")
    
    def save(self, *args, **kwargs):
        super(Address, self).save(*args, **kwargs)
        
class Card(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name="account_card")
    flag_card = models.CharField(max_length=20, default="Mastercard")
    number = models.CharField(max_length=16, unique=True)
    validity = models.DateField()
    cvv = models.IntegerField()
    
    def save(self, *args, **kwargs):
        super(Card, self).save(*args, **kwargs)
        
class Movimentation(models.Model):
    date_hour = models.DateTimeField(auto_now_add=True)
    account =  models.ForeignKey(Account, on_delete=models.CASCADE, related_name="account_movimentation")
    value = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    state = models.CharField(max_length=100, blank=False)
    
    def save(self, *args, **kwargs):
        super(Movimentation, self).save(*args, **kwargs)
        
class Loan(models.Model):
    date_solicitation = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=False)
    fees = models.DecimalField(max_digits=3, decimal_places=1, blank=True)
    date_approved = models.DateField(auto_now_add=True)
    requested_amount = models.DecimalField(max_digits=10, decimal_places=3, blank=False)
    approved = models.BooleanField(blank=True)
    installment_quantity = models.IntegerField()
    installment_value = models.DecimalField(max_digits=10,decimal_places=2, blank=True )
    
    def save(self, *args, **kwargs):
        super(Loan, self).save(*args, **kwargs)

class Investment(models.Model):
    contribuition = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    investment_type = models.CharField(max_length=30, blank=False)
    rentability = models.CharField(max_length=20, blank=True)
    date_closure = models.CharField(max_length=10, blank=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="investment")
    administration_fee = models.DecimalField(max_digits=3, decimal_places=2, blank=True)
    
    def save(self, *args, **kwargs):
        super(Investment, self).save(*args, **kwargs)
        
class LoanInstallment(models.Model):
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    due_date = models.CharField(max_length=10, blank=False)
    installment_paid = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    payment_date = models.DateField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        super(LoanInstallment, self).save(*args, **kwargs)

class Pix(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="from_account")
    value = models.DecimalField(max_digits=10, decimal_places=2)
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="to_account")
        
    def save(self, *args, **kwargs):
        super(Pix, self).save(*args, **kwargs)

    

class CreditCard(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE, null=False, unique=True, related_name="account_card_credit")
    flag_card = models.CharField(max_length=20, blank=True)
    number = models.CharField(max_length=16, unique=True, blank=True)
    validity = models.DateField(blank=True)
    cvv = models.IntegerField( blank=True)
    limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
        
    



    
