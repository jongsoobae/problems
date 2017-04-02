class Thing(object):

	def __init__(self, name):
		self.name = name

	class is_a(object):
		person = True
		pass


jane = Thing('Jane')
print jane.name

print jane.is_a