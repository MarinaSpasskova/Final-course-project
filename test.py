from datetime import datetime, timedelta
import unittest
from app import app, db
from app.models import User, Post


class UserModelCase(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_password_hashing(self):
        u = User(username='mark')
        u.set_password('111')
        self.assertFalse(u.check_password('222'))
        self.assertTrue(u.check_password('111'))

    def test_avatar(self):
        u = User(username='john', email='john@example.com')
        self.assertEqual(u.avatar(128), ('https://www.gravatar.com/avatar/'
                                         'd4c74594d841139328695756648b6bd6'
                                         '?d=identicon&s=128'))

    def test_follow(self):
        u_1 = User(username='Mark', email='mark@a.com')
        u_2 = User(username='Nelly', email='nelly@a.com')
        db.session.add(u_1)
        db.session.add(u_2)
        db.session.commit()
        self.assertEqual(u_1.followed.all(), [])
        self.assertEqual(u_1.followers.all(), [])

        u_1.follow(u_2)
        db.session.commit()
        self.assertTrue(u_1.is_following(u_2))
        self.assertEqual(u_1.followed.count(), 1)
        self.assertEqual(u_1.followed.first().username, 'Nelly')
        self.assertEqual(u_2.followers.count(), 1)
        self.assertEqual(u_2.followers.first().username, 'Mark')

        u_1.unfollow(u_2)
        db.session.commit()
        self.assertFalse(u_1.is_following(u_2))
        self.assertEqual(u_1.followed.count(), 0)
        self.assertEqual(u_2.followers.count(), 0)

    def test_follow_posts(self):
        u_1 = User(username='Mark', email='mark@a.com')
        u_2 = User(username='Nelly', email='nelly@a.com')
        u_3 = User(username='Marpha', email='marpha@a.com')
        u_4 = User(username='Nickodim', email='nickodim@a.com')
        db.session.add_all([u_1, u_2, u_3, u_4])

        now = datetime.utcnow()
        p_1 = Post(body="Hi, I`m Mark!", author=u_1,
                    timestamp=now+timedelta(seconds=1))
        p_2 = Post(body="Hi, I`m Nelly!", author=u_2,
                    timestamp=now + timedelta(seconds=4))
        p_3 = Post(body="Hi, I`m Marpha!", author=u_3,
                    timestamp=now + timedelta(seconds=3))
        p_4 = Post(body="Hi, I`m Nickodim!", author=u_4,
                    timestamp=now + timedelta(seconds=2))
        db.session.add_all([p_1, p_2, p_3, p_4])
        db.session.commit()

        u_1.follow(u_2)  # john follows susan
        u_1.follow(u_4)  # john follows david
        u_2.follow(u_3)  # susan follows mary
        u_3.follow(u_4)  # mary follows david
        db.session.commit()

        f_1 = u_1.followed_posts().all()
        f_2 = u_2.followed_posts().all()
        f_3 = u_3.followed_posts().all()
        f_4 = u_4.followed_posts().all()
        self.assertEqual(f_1, [p_1])
        self.assertEqual(f_2, [p_2])
        self.assertEqual(f_3, [p_3])
        self.assertEqual(f_4, [p_4])


if __name__ == '__main__':
    unittest.main(verbosity=2)