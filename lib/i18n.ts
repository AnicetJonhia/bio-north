export const defaultLocale = "fr"
export const locales = ["fr", "en"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "À propos",
      products: "Produits",
      services: "Services",
      contact: "Contact",
      admin: "Administration",
    },
    // Home page
    home: {
      hero: {
        badge: "Produits Bio & Locaux",
        title: "Bio North Madagascar",
        description:
          "Découvrez l'authenticité des produits biologiques malgaches de la région SAVA. Nous valorisons le terroir d'Andapa à travers des produits naturels de qualité exceptionnelle.",
        cta1: "Découvrir nos produits",
        cta2: "Voir la vidéo",
        stats: {
          bio: "Bio",
          local: "Local",
          region: "Région",
        },
      },
      services: {
        title: "Nos Produits & Services",
        description:
          "Une sélection rigoureuse de produits biologiques authentiques, cultivés dans le respect des traditions malgaches et de l'environnement.",
        spices: {
          title: "Épices & Aromates",
          description: "Vanille, poivre, cannelle et autres épices authentiques de Madagascar",
        },
        processed: {
          title: "Produits Transformés",
          description: "Huiles essentielles, confitures et produits artisanaux locaux",
        },
        medicinal: {
          title: "Plantes Médicinales",
          description: "Tisanes et plantes médicinales traditionnelles malgaches",
        },
        learnMore: "En savoir plus",
      },
      about: {
        badge: "À propos",
        title: "Notre Mission",
        description:
          "Bio North Madagascar (SARL) est née de la passion pour les richesses naturelles de Madagascar. Basée à Andapa dans la région SAVA, notre entreprise s'engage à promouvoir les produits biologiques locaux tout en soutenant les communautés rurales.",
        values: {
          organic: {
            title: "Agriculture Biologique",
            description: "Respect des pratiques agricoles durables et biologiques",
          },
          fair: {
            title: "Commerce Équitable",
            description: "Soutien direct aux producteurs locaux",
          },
          quality: {
            title: "Qualité Premium",
            description: "Sélection rigoureuse et contrôle qualité",
          },
        },
        cta: "En savoir plus sur nous",
      },
      cta: {
        title: "Prêt à découvrir nos produits authentiques ?",
        description:
          "Contactez-nous dès aujourd'hui pour en savoir plus sur notre gamme de produits biologiques malgaches de qualité exceptionnelle.",
        products: "Voir nos produits",
        contact: "Nous contacter",
      },
    },
    // About page
    about: {
      hero: {
        badge: "À propos de nous",
        title: "Bio North Madagascar SARL",
        description:
          "Depuis notre siège à Andapa dans la région SAVA, nous nous engageons à promouvoir les richesses naturelles de Madagascar à travers des produits biologiques d'exception.",
      },
      story: {
        title: "Notre Histoire",
        p1: "Bio North Madagascar est née de la passion pour les trésors naturels de la Grande Île. Fondée par des entrepreneurs locaux conscients de la richesse exceptionnelle de la biodiversité malgache, notre entreprise s'est donnée pour mission de valoriser les produits du terroir tout en respectant l'environnement et les communautés locales.",
        p2: "Basée à Andapa, au cœur de la région SAVA réputée pour sa vanille de renommée mondiale, nous travaillons directement avec les producteurs locaux pour garantir la qualité et l'authenticité de nos produits biologiques.",
      },
      mission: {
        title: "Notre Mission & Nos Valeurs",
        description:
          "Nous nous engageons à promouvoir un commerce équitable et durable qui bénéficie à tous les acteurs de la chaîne de valeur.",
        values: {
          mission: {
            title: "Notre Mission",
            description:
              "Valoriser les produits biologiques malgaches en garantissant leur qualité et leur authenticité, tout en soutenant les communautés rurales.",
          },
          sustainability: {
            title: "Durabilité",
            description:
              "Nous privilégions les pratiques agricoles respectueuses de l'environnement et soutenons la biodiversité unique de Madagascar.",
          },
          fairTrade: {
            title: "Commerce Équitable",
            description:
              "Nous établissons des partenariats durables avec les producteurs locaux en garantissant des prix justes et des conditions équitables.",
          },
        },
      },
      company: {
        title: "Informations Générales",
        legal: {
          title: "Statut Juridique",
          value: "Bio North Madagascar SARL",
          subtitle: "Société à Responsabilité Limitée",
        },
        location: {
          title: "Siège Social",
          value: "Andapa, Région SAVA",
          subtitle: "Madagascar, Océan Indien",
        },
        activity: {
          title: "Secteur d'Activité",
          value: "Commerce de produits biologiques",
          subtitle: "Valorisation du terroir malgache",
        },
        coverage: {
          title: "Zone de Couverture",
          value: "Madagascar et Export International",
          subtitle: "Focus sur la région SAVA",
        },
      },
      commitment: {
        title: "Notre Engagement",
        description: "Une équipe passionnée au service de la qualité et de l'authenticité",
        quality: {
          title: "Qualité Garantie",
          description: "Contrôle rigoureux à chaque étape, de la production à la livraison",
        },
        partnerships: {
          title: "Partenariats Locaux",
          description: "Collaboration directe avec les producteurs de la région SAVA",
        },
        environment: {
          title: "Respect de l'Environnement",
          description: "Pratiques durables et préservation de la biodiversité malgache",
        },
      },
    },
    // Products page
    products: {
      hero: {
        badge: "Nos Produits",
        title: "Produits Biologiques de Madagascar",
        description:
          "Découvrez notre sélection de produits authentiques, cultivés dans le respect des traditions malgaches et de l'environnement.",
      },
      filters: {
        search: "Rechercher un produit...",
        category: "Catégorie",
        allCategories: "Toutes les catégories",
        spices: "Épices & Aromates",
        oils: "Huiles Essentielles",
        plants: "Plantes Médicinales",
        processed: "Produits Transformés",
        results: "produits trouvés",
      },
      product: {
        unavailable: "Temporairement indisponible",
        seeDetails: "Voir détails",
        notAvailable: "Indisponible",
        inStock: "En stock",
        outOfStock: "Rupture de stock",
        addToCart: "Ajouter au panier",
      },
      categories: {
        title: "Nos Catégories de Produits",
        description: "Une gamme complète de produits biologiques authentiques de Madagascar",
        spices: {
          title: "Épices & Aromates",
          description: "Vanille, poivre, cannelle et autres épices authentiques",
        },
        oils: {
          title: "Huiles Essentielles",
          description: "Huiles pures distillées artisanalement",
        },
        plants: {
          title: "Plantes Médicinales",
          description: "Tisanes et plantes traditionnelles malgaches",
        },
        processed: {
          title: "Produits Transformés",
          description: "Miels, confitures et produits artisanaux",
        },
      },
    },
    // Contact page
    contact: {
      hero: {
        badge: "Contact",
        title: "Contactez-nous",
        description:
          "Nous sommes à votre écoute pour répondre à toutes vos questions sur nos produits biologiques malgaches.",
      },
      form: {
        title: "Envoyez-nous un message",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone",
        subject: "Sujet",
        message: "Message",
        send: "Envoyer le message",
        success: "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
        required: "*",
        placeholders: {
          firstName: "Votre prénom",
          lastName: "Votre nom",
          email: "votre.email@exemple.com",
          phone: "+261 XX XX XXX XX",
          subject: "Objet de votre message",
          message: "Décrivez votre demande en détail...",
        },
      },
      info: {
        title: "Nos Coordonnées",
        description:
          "N'hésitez pas à nous contacter par téléphone, email ou via nos réseaux sociaux. Notre équipe se fera un plaisir de vous renseigner.",
        address: {
          title: "Adresse",
          subtitle: "Notre siège social",
        },
        phone: {
          title: "Téléphone",
          subtitle: "Appelez-nous directement",
          hours: "Lundi - Vendredi: 8h00 - 17h00",
        },
        email: {
          title: "Email",
          subtitle: "Écrivez-nous",
          response: "Réponse sous 24h",
        },
        schedule: {
          title: "Horaires",
          subtitle: "Nos heures d'ouverture",
        },
        social: "Suivez-nous",
      },
      map: {
        title: "Notre Localisation",
        description: "Située au cœur de la région SAVA, réputée pour ses produits d'exception",
        location: "Andapa, Région SAVA",
        coming: "Carte interactive disponible prochainement",
      },
    },
    // Admin
    admin: {
      login: {
        title: "Connexion Administrateur",
        description: "Connectez-vous pour accéder à l'interface d'administration",
        email: "Email",
        password: "Mot de passe",
        login: "Se connecter",
        error: "Identifiants incorrects",
        demo: "Identifiants de démonstration :",
      },
      dashboard: {
        title: "Administration - Bio North Madagascar",
        description: "Gestion des produits et du contenu du site web",
        logout: "Déconnexion",
        welcome: "Bienvenue dans l'interface d'administration",
      },
      tabs: {
        overview: "Vue d'ensemble",
        categories: "Catégories",
        products: "Produits",
        addProduct: "Ajouter Produit",
        messages: "Messages",
        contactInfo: "Coordonnées",
        content: "Contenu",
        analytics: "Statistiques",
      },
      overview: {
        title: "Vue d'ensemble",
        description: "Aperçu rapide de votre activité",
      },
      contactInfo: {
        title: "Informations de Contact",
        description: "Gérez les coordonnées de votre entreprise",
        companyName: "Nom de l'entreprise",
        address: "Adresse",
        phone: "Téléphone",
        email: "Email",
        facebook: "Facebook",
        linkedin: "LinkedIn",
        businessHours: "Horaires d'ouverture",
        weekdays: "Lundi - Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche",
        save: "Sauvegarder",
        success: "Coordonnées mises à jour avec succès !",
        error: "Erreur lors de la mise à jour",
        actions: {
          add: "Ajouter les contacts",
          update: "Mettre à jour",
          edit: "Modifier",
          delete: "Supprimer",
          cancel: "Annuler",
        },

      },
      categories: {
        title: "Gestion des Catégories",
        description: "Gérez les catégories de produits",
        add: "Ajouter Catégorie",
        addNew: "Ajouter une nouvelle catégorie",
        name: "Nom (Français)",
        nameEn: "Nom (Anglais)",
        description: "Description (Français)",
        descriptionEn: "Description (Anglais)",
        icon: "Icône",
        actions: {
          add: "Ajouter la catégorie",
          update: "Mettre à jour",
          edit: "Modifier",
          delete: "Supprimer",
          cancel: "Annuler",
        },
        placeholders: {
          name: "Ex: Épices & Aromates",
          nameEn: "Ex: Spices & Aromatics",
          description: "Description de la catégorie...",
          descriptionEn: "Category description...",
        },
        success: {
          added: "Catégorie ajoutée avec succès !",
          updated: "Catégorie mise à jour avec succès !",
          deleted: "Catégorie supprimée avec succès !",
        },
        error: {
          add: "Erreur lors de l'ajout de la catégorie",
          update: "Erreur lors de la mise à jour",
          delete: "Erreur lors de la suppression",
        },
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      },
      products: {
        title: "Gestion des Produits",
        description: "Gérez votre catalogue de produits biologiques",
        table: {
          image: "Image",
          name: "Nom",
          category: "Catégorie",
          price: "Prix (€)",
          stock: "Stock",
          status: "Statut",
          actions: "Actions",
          available: "Disponible",
          unavailable: "Indisponible",
          rating: "Note",
        },
        actions: {
          edit: "Modifier",
          view: "Voir",
          delete: "Supprimer",
          confirmDelete: "Êtes-vous sûr de vouloir supprimer ce produit ?",
        },
      },
      addProduct: {
        title: "Ajouter un Nouveau Produit",
        description: "Ajoutez un nouveau produit à votre catalogue",
        editTitle: "Modifier le produit",
        form: {
          name: "Nom du produit",
          nameEn: "Nom en anglais",
          category: "Catégorie",
          price: "Prix (€)",
          stock: "Stock initial",
          description: "Description",
          descriptionEn: "Description en anglais",
          available: "Produit disponible",
          rating: "Note (1-5)",
          certifications: "Certifications",
          selectCategory: "Sélectionner une catégorie",
          image: "Image du produit",
          imageUrl: "URL de l'image",
          imageUpload: "Télécharger une image",
          uploadFromDevice: "Depuis votre appareil",
          dragDrop: "Glissez-déposez une image ici ou cliquez pour sélectionner",
          supportedFormats: "Formats supportés: JPG, PNG, WebP (max 5MB)",
          uploading: "Téléchargement en cours...",
          placeholders: {
            name: "Ex: Vanille Bourbon Premium",
            nameEn: "Ex: Premium Bourbon Vanilla",
            price: "0.00",
            stock: "0",
            description: "Description détaillée du produit...",
            descriptionEn: "Detailed product description...",
            certifications: "Bio, Commerce Équitable (séparés par des virgules)",
            imageUrl: "https://exemple.com/image.jpg",
          },
        },
        actions: {
          add: "Ajouter le produit",
          update: "Mettre à jour",
          reset: "Réinitialiser",
          cancel: "Annuler",
        },
        success: "Produit ajouté avec succès !",
        updateSuccess: "Produit mis à jour avec succès !",
        error: "Erreur lors de l'ajout du produit",
        updateError: "Erreur lors de la mise à jour",
        uploadError: "Erreur lors du téléchargement de l'image",
      },
      messages: {
        title: "Messages de Contact",
        description: "Gérez les messages reçus via le formulaire de contact",
        viewMessage: "Voir le message",
        messageDetails: "Détails du message",
        from: "De",
        subject: "Sujet",
        date: "Date",
        phone: "Téléphone",
        content: "Contenu du message",
        table: {
          name: "Nom",
          email: "Email",
          subject: "Sujet",
          date: "Date",
          status: "Statut",
          actions: "Actions",
        },
        status: {
          new: "Nouveau",
          read: "Lu",
          replied: "Répondu",
        },
        actions: {
          markRead: "Marquer comme lu",
          markReplied: "Marquer comme répondu",
          view: "Voir",
          delete: "Supprimer",
          confirmDelete: "Êtes-vous sûr de vouloir supprimer ce message ?",
          deleted: "Message supprimé avec succès !",
          deleteError: "Erreur lors de la suppression du message",
          close:"Fermer",
          cancel:"Annuler",
        },
        empty: "Aucun message pour le moment",
      },
      content: {
        title: "Gestion du Contenu",
        description: "Modifiez le contenu du site web",
        home: {
          title: "Contenu de la page d'accueil",
          description: "Modifiez le contenu principal",
          heroTitle: "Titre principal",
          heroDescription: "Description",
        },
        contact: {
          title: "Informations de contact",
          description: "Mettez à jour vos coordonnées",
          phone: "Téléphone",
          email: "Email",
          address: "Adresse",
        },
        save: "Sauvegarder",
        success: "Contenu mis à jour avec succès !",
        error: "Erreur lors de la mise à jour",
      },
      analytics: {
        title: "Statistiques",
        description: "Analysez les performances de votre site",
        totalProducts: "Total Produits",
        availableProducts: "Produits Disponibles",
        totalStock: "Stock Total",
        lowStock: "Stock Faible",
        totalMessages: "Total Messages",
        newMessages: "Nouveaux Messages",
        readMessages: "Messages Lus",
        repliedMessages: "Messages Répondus",
        totalCategories: "Total Catégories",
        activeCategories: "Catégories Actives",
        units: "Unités en stock",
        catalog: "du catalogue",
        lastMonth: "depuis le mois dernier",
        thisWeek: "cette semaine",
      },
    },
    // Footer
    footer: {
      description:
        "Votre partenaire de confiance pour les produits biologiques authentiques de Madagascar, cultivés dans le respect de la nature et des traditions.",
      quickLinks: "Liens Rapides",
      ourProducts: "Nos Produits",
      contact: "Contact",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      admin: "Administration",
      products: {
        spices: "Épices & Aromates",
        oils: "Huiles Essentielles",
        plants: "Plantes Médicinales",
        processed: "Produits Transformés",
      },
    },
    // Common
    common: {
      loading: "Chargement...",
      error: "Une erreur s'est produite",
      success: "Succès",
      cancel: "Annuler",
      save: "Sauvegarder",
      edit: "Modifier",
      delete: "Supprimer",
      view: "Voir",
      back: "Retour",
      yes: "Oui",
      no: "Non",
      confirm: "Confirmer",
      close: "Fermer",
      next: "Suivant",
      previous: "Précédent",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      all: "Tout",
      none: "Aucun",
      select: "Sélectionner",
      required: "Requis",
      optional: "Optionnel",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      services: "Services",
      contact: "Contact",
      admin: "Administration",
    },
    // Home page
    home: {
      hero: {
        badge: "Organic & Local Products",
        title: "Bio North Madagascar",
        description:
          "Discover the authenticity of Malagasy organic products from the SAVA region. We showcase the Andapa terroir through exceptional quality natural products.",
        cta1: "Discover our products",
        cta2: "Watch video",
        stats: {
          bio: "Organic",
          local: "Local",
          region: "Region",
        },
      },
      services: {
        title: "Our Products & Services",
        description:
          "A rigorous selection of authentic organic products, cultivated with respect for Malagasy traditions and the environment.",
        spices: {
          title: "Spices & Aromatics",
          description: "Vanilla, pepper, cinnamon and other authentic spices from Madagascar",
        },
        processed: {
          title: "Processed Products",
          description: "Essential oils, jams and local artisanal products",
        },
        medicinal: {
          title: "Medicinal Plants",
          description: "Traditional Malagasy herbal teas and medicinal plants",
        },
        learnMore: "Learn more",
      },
      about: {
        badge: "About",
        title: "Our Mission",
        description:
          "Bio North Madagascar (SARL) was born from a passion for Madagascar's natural riches. Based in Andapa in the SAVA region, our company is committed to promoting local organic products while supporting rural communities.",
        values: {
          organic: {
            title: "Organic Agriculture",
            description: "Respect for sustainable and organic farming practices",
          },
          fair: {
            title: "Fair Trade",
            description: "Direct support to local producers",
          },
          quality: {
            title: "Premium Quality",
            description: "Rigorous selection and quality control",
          },
        },
        cta: "Learn more about us",
      },
      cta: {
        title: "Ready to discover our authentic products?",
        description: "Contact us today to learn more about our range of exceptional quality Malagasy organic products.",
        products: "View our products",
        contact: "Contact us",
      },
    },
    // About page
    about: {
      hero: {
        badge: "About us",
        title: "Bio North Madagascar SARL",
        description:
          "From our headquarters in Andapa in the SAVA region, we are committed to promoting Madagascar's natural riches through exceptional organic products.",
      },
      story: {
        title: "Our Story",
        p1: "Bio North Madagascar was born from a passion for the natural treasures of the Big Island. Founded by local entrepreneurs aware of the exceptional richness of Malagasy biodiversity, our company has set itself the mission of promoting local products while respecting the environment and local communities.",
        p2: "Based in Andapa, in the heart of the SAVA region renowned for its world-famous vanilla, we work directly with local producers to guarantee the quality and authenticity of our organic products.",
      },
      mission: {
        title: "Our Mission & Values",
        description:
          "We are committed to promoting fair and sustainable trade that benefits all stakeholders in the value chain.",
        values: {
          mission: {
            title: "Our Mission",
            description:
              "To promote Malagasy organic products by guaranteeing their quality and authenticity, while supporting rural communities.",
          },
          sustainability: {
            title: "Sustainability",
            description:
              "We favor environmentally friendly agricultural practices and support Madagascar's unique biodiversity.",
          },
          fairTrade: {
            title: "Fair Trade",
            description:
              "We establish sustainable partnerships with local producers by guaranteeing fair prices and equitable conditions.",
          },
        },
      },
      company: {
        title: "General Information",
        legal: {
          title: "Legal Status",
          value: "Bio North Madagascar SARL",
          subtitle: "Limited Liability Company",
        },
        location: {
          title: "Headquarters",
          value: "Andapa, SAVA Region",
          subtitle: "Madagascar, Indian Ocean",
        },
        activity: {
          title: "Business Sector",
          value: "Organic products trade",
          subtitle: "Malagasy terroir enhancement",
        },
        coverage: {
          title: "Coverage Area",
          value: "Madagascar and International Export",
          subtitle: "Focus on SAVA region",
        },
      },
      commitment: {
        title: "Our Commitment",
        description: "A passionate team serving quality and authenticity",
        quality: {
          title: "Guaranteed Quality",
          description: "Rigorous control at every stage, from production to delivery",
        },
        partnerships: {
          title: "Local Partnerships",
          description: "Direct collaboration with SAVA region producers",
        },
        environment: {
          title: "Environmental Respect",
          description: "Sustainable practices and preservation of Malagasy biodiversity",
        },
      },
    },
    // Products page
    products: {
      hero: {
        badge: "Our Products",
        title: "Organic Products from Madagascar",
        description:
          "Discover our selection of authentic products, cultivated with respect for Malagasy traditions and the environment.",
      },
      filters: {
        search: "Search for a product...",
        category: "Category",
        allCategories: "All categories",
        spices: "Spices & Aromatics",
        oils: "Essential Oils",
        plants: "Medicinal Plants",
        processed: "Processed Products",
        results: "products found",
      },
      product: {
        unavailable: "Temporarily unavailable",
        seeDetails: "See details",
        notAvailable: "Unavailable",
        inStock: "In stock",
        outOfStock: "Out of stock",
        addToCart: "Add to cart",
      },
      categories: {
        title: "Our Product Categories",
        description: "A complete range of authentic organic products from Madagascar",
        spices: {
          title: "Spices & Aromatics",
          description: "Vanilla, pepper, cinnamon and other authentic spices",
        },
        oils: {
          title: "Essential Oils",
          description: "Pure oils distilled artisanally",
        },
        plants: {
          title: "Medicinal Plants",
          description: "Traditional Malagasy herbal teas and plants",
        },
        processed: {
          title: "Processed Products",
          description: "Honey, jams and artisanal products",
        },
      },
    },
    // Contact page
    contact: {
      hero: {
        badge: "Contact",
        title: "Contact us",
        description: "We are here to answer all your questions about our Malagasy organic products.",
      },
      form: {
        title: "Send us a message",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        success: "Your message has been sent successfully! We will respond to you as soon as possible.",
        required: "*",
        placeholders: {
          firstName: "Your first name",
          lastName: "Your last name",
          email: "your.email@example.com",
          phone: "+261 XX XX XXX XX",
          subject: "Subject of your message",
          message: "Describe your request in detail...",
        },
      },
      info: {
        title: "Our Contact Information",
        description:
          "Feel free to contact us by phone, email or via our social networks. Our team will be happy to help you.",
        address: {
          title: "Address",
          subtitle: "Our headquarters",
        },
        phone: {
          title: "Phone",
          subtitle: "Call us directly",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
        },
        email: {
          title: "Email",
          subtitle: "Write to us",
          response: "Response within 24h",
        },
        schedule: {
          title: "Schedule",
          subtitle: "Our opening hours",
        },
        social: "Follow us",
      },
      map: {
        title: "Our Location",
        description: "Located in the heart of the SAVA region, renowned for its exceptional products",
        location: "Andapa, SAVA Region",
        coming: "Interactive map coming soon",
      },
    },
    // Admin
    admin: {
      login: {
        title: "Administrator Login",
        description: "Log in to access the administration interface",
        email: "Email",
        password: "Password",
        login: "Log in",
        error: "Incorrect credentials",
        demo: "Demo credentials:",
      },
      dashboard: {
        title: "Administration - Bio North Madagascar",
        description: "Product and website content management",
        logout: "Logout",
        welcome: "Welcome to the administration interface",
      },
      tabs: {
        overview: "Overview",
        categories: "Categories",
        products: "Products",
        addProduct: "Add Product",
        messages: "Messages",
        contactInfo: "Contact Info",
        content: "Content",
        analytics: "Analytics",
      },
      overview: {
        title: "Overview",
        description: "Quick overview of your activity",
      },
      contactInfo: {
        title: "Contact Information",
        description: "Manage your company contact details",
        companyName: "Company Name",
        address: "Address",
        phone: "Phone",
        email: "Email",
        facebook: "Facebook",
        linkedin: "LinkedIn",
        businessHours: "Business Hours",
        weekdays: "Monday - Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        save: "Save",
        success: "Contact information updated successfully!",
        error: "Error updating contact information",
         actions: {
          add: "Add Contact",
          update: "Update",
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
        },
      },
      categories: {
        title: "Category Management",
        description: "Manage product categories",
        add: "Add Category",
        addNew: "Add a new category",
        name: "Name (French)",
        nameEn: "Name (English)",
        description: "Description (French)",
        descriptionEn: "Description (English)",
        icon: "Icon",
        actions: {
          add: "Add category",
          update: "Update",
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
        },
        placeholders: {
          name: "Ex: Spices & Aromatics",
          nameEn: "Ex: Spices & Aromatics",
          description: "Category description...",
          descriptionEn: "Category description...",
        },
        success: {
          added: "Category added successfully!",
          updated: "Category updated successfully!",
          deleted: "Category deleted successfully!",
        },
        error: {
          add: "Error adding category",
          update: "Error updating category",
          delete: "Error deleting category",
        },
        confirmDelete: "Are you sure you want to delete this category?",
      },
      products: {
        title: "Product Management",
        description: "Manage your organic product catalog",
        table: {
          image: "Image",
          name: "Name",
          category: "Category",
          price: "Price (€)",
          stock: "Stock",
          status: "Status",
          actions: "Actions",
          available: "Available",
          unavailable: "Unavailable",
          rating: "Rating",
        },
        actions: {
          edit: "Edit",
          view: "View",
          delete: "Delete",
          confirmDelete: "Are you sure you want to delete this product?",
        },
      },
      addProduct: {
        title: "Add New Product",
        description: "Add a new product to your catalog",
        editTitle: "Edit product",
        form: {
          name: "Product name",
          nameEn: "Name in English",
          category: "Category",
          price: "Price (€)",
          stock: "Initial stock",
          description: "Description",
          descriptionEn: "Description in English",
          available: "Product available",
          rating: "Rating (1-5)",
          certifications: "Certifications",
          selectCategory: "Select a category",
          image: "Product image",
          imageUrl: "Image URL",
          imageUpload: "Upload image",
          uploadFromDevice: "From your device",
          dragDrop: "Drag and drop an image here or click to select",
          supportedFormats: "Supported formats: JPG, PNG, WebP (max 5MB)",
          uploading: "Uploading...",
          placeholders: {
            name: "Ex: Premium Bourbon Vanilla",
            nameEn: "Ex: Premium Bourbon Vanilla",
            price: "0.00",
            stock: "0",
            description: "Detailed product description...",
            descriptionEn: "Detailed product description...",
            certifications: "Organic, Fair Trade (comma separated)",
            imageUrl: "https://example.com/image.jpg",
          },
        },
        actions: {
          add: "Add product",
          update: "Update",
          reset: "Reset",
          cancel: "Cancel",
        },
        success: "Product added successfully!",
        updateSuccess: "Product updated successfully!",
        error: "Error adding product",
        updateError: "Error updating product",
        uploadError: "Error uploading image",
      },
      messages: {
        title: "Contact Messages",
        description: "Manage messages received via the contact form",
        viewMessage: "View message",
        messageDetails: "Message details",
        from: "From",
        subject: "Subject",
        date: "Date",
        phone: "Phone",
        content: "Message content",
        table: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          date: "Date",
          status: "Status",
          actions: "Actions",
        },
        status: {
          new: "New",
          read: "Read",
          replied: "Replied",
        },
        actions: {
          markRead: "Mark as read",
          markReplied: "Mark as replied",
          view: "View",
          delete: "Delete",
          confirmDelete: "Are you sure you want to delete this message?",
          deleted: "Message deleted successfully!",
          deleteError:" Error deleting message",

          close:"Close",
          cancel:"Cancel",
        },
        empty: "No messages yet",
      },
      content: {
        title: "Content Management",
        description: "Edit website content",
        home: {
          title: "Homepage content",
          description: "Edit main content",
          heroTitle: "Main title",
          heroDescription: "Description",
        },
        contact: {
          title: "Contact information",
          description: "Update your contact details",
          phone: "Phone",
          email: "Email",
          address: "Address",
        },
        save: "Save",
        success: "Content updated successfully!",
        error: "Error updating content",
      },
      analytics: {
        title: "Analytics",
        description: "Analyze your website performance",
        totalProducts: "Total Products",
        availableProducts: "Available Products",
        totalStock: "Total Stock",
        lowStock: "Low Stock",
        totalMessages: "Total Messages",
        newMessages: "New Messages",
        readMessages: "Read Messages",
        repliedMessages: "Replied Messages",
        totalCategories: "Total Categories",
        activeCategories: "Active Categories",
        units: "Units in stock",
        catalog: "of catalog",
        lastMonth: "since last month",
        thisWeek: "this week",
      },
    },
    // Footer
    footer: {
      description:
        "Your trusted partner for authentic organic products from Madagascar, cultivated with respect for nature and traditions.",
      quickLinks: "Quick Links",
      ourProducts: "Our Products",
      contact: "Contact",
      followUs: "Follow us",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      admin: "Administration",
      products: {
        spices: "Spices & Aromatics",
        oils: "Essential Oils",
        plants: "Medicinal Plants",
        processed: "Processed Products",
      },
    },
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      back: "Back",
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      close: "Close",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      all: "All",
      none: "None",
      select: "Select",
      required: "Required",
      optional: "Optional",
    },
  },
}

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}
